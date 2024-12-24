from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')
DATABASE_NAME = os.getenv('DATABASE_NAME')
LOG_COLLECTION = os.getenv('LOG_COLLECTION')
OFFLINE_LOG_FILE = os.getenv('OFFLINE_LOG_FILE', 'offline_logs.json')
