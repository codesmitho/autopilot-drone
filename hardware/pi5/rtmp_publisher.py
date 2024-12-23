import cv2
import subprocess
import time

# RTMP Server URL
rtmp_url = "rtmp://localhost:1935/live/your_stream_key"

# OpenCV Video Capture
cap = cv2.VideoCapture(0)  # Use 0 for default camera

# Set resolution and frame rate
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FPS, 30)
cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # Drop old frames immediately

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Get frame properties
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
frame_rate = int(cap.get(cv2.CAP_PROP_FPS)) or 30  # Default to 30 if FPS is 0

print(f"Frame size: {frame_width}x{frame_height}, FPS: {frame_rate}")

# FFmpeg command optimized for low-latency
ffmpeg_cmd = [
    'ffmpeg',
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-pix_fmt', 'bgr24',
    '-s', f"{frame_width}x{frame_height}",
    '-r', str(frame_rate),
    '-i', '-',  # Input from stdin
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-fflags', 'nobuffer',  # Disable buffering
    '-flags', 'low_delay',  # Enable low-delay mode
    '-max_delay', '0',  # Disable max delay
    '-bufsize', '64k',  # Small buffer size
    '-g', '30',  # Keyframe interval (1 second at 30 FPS)
    '-an',  # Disable audio for minimal processing
    '-f', 'flv',
    rtmp_url  # Output RTMP stream
]

# Start FFmpeg process
try:
    process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    last_time = time.time()
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to grab frame.")
            break

        # Ensure frame dimensions are correct
        if frame.shape[1] != frame_width or frame.shape[0] != frame_height:
            frame = cv2.resize(frame, (frame_width, frame_height))

        # Write frame to FFmpeg's stdin
        process.stdin.write(frame.tobytes())

        # Display the frame locally (optional, may cause slight delay)
        cv2.imshow('RTMP Stream (Low Latency)', frame)

        # Non-blocking waitKey
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Stopping streaming...")
            break

except KeyboardInterrupt:
    print("Streaming stopped by user.")
except BrokenPipeError:
    print("Error: FFmpeg encountered a broken pipe.")
except Exception as e:
    print(f"Unexpected error: {e}")
    stderr_output = process.stderr.read().decode()
    print(f"FFmpeg stderr: {stderr_output}")

finally:
    cap.release()
    if process.stdin:
        process.stdin.close()
    process.wait()
    cv2.destroyAllWindows()
    print("Streaming finished.")
