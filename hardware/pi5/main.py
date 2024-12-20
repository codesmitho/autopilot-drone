import torch
import cv2
import numpy as np
from torchvision.transforms import Compose, Normalize, Resize, ToTensor
from PIL import Image

# Check for GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load MiDaS model (small version) and move to the appropriate device
midas_model = torch.hub.load("isl-org/MiDaS", "MiDaS_small").to(device)
midas_model.eval()

# Open the webcam
cap = cv2.VideoCapture(0)  # 0 for default camera

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

# Use a lower frame resolution for performance
fixed_width, fixed_height = 256, 192  # Adjust to a smaller resolution

# MiDaS transforms
midas_transforms = Compose([
    Resize((fixed_height, fixed_width)),  # Smaller resolution for performance
    ToTensor(),
    Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225))
])

frame_skip = 2  # Process every 2nd frame
frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture frame.")
        break

    # Skip frames for performance
    frame_count += 1
    if frame_count % frame_skip != 0:
        continue

    # Resize the frame
    frame_resized = cv2.resize(frame, (fixed_width, fixed_height))

    # Convert frame to RGB for MiDaS
    frame_rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)

    # Convert numpy array to PIL image
    frame_pil = Image.fromarray(frame_rgb)

    # Prepare the input for MiDaS
    input_batch = midas_transforms(frame_pil).unsqueeze(0).to(device)  # Apply transforms and add batch dimension

    # Perform depth estimation
    with torch.no_grad():
        depth_prediction = midas_model(input_batch)
        depth_map = depth_prediction.squeeze().cpu().numpy()

    # Resize and normalize depth map for visualization
    depth_map_resized = cv2.resize(depth_map, (frame.shape[1], frame.shape[0]))
    depth_map_normalized = cv2.normalize(depth_map_resized, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

    # Apply a color map for visualization
    depth_map_visual = cv2.applyColorMap(depth_map_normalized, cv2.COLORMAP_JET)

    # Display the depth map
    cv2.imshow('Depth Map', depth_map_visual)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
