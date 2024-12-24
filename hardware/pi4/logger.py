from pymongo import MongoClient
from datetime import datetime
import os
import json

OFFLINE_LOG_FILE = 'offline_logs.json'

class DatabaseLogger:
    def __init__(self, client: MongoClient, database_name: str, log_collection: str):
        try:
            self.db = client[database_name]
            self.logs = self.db[log_collection]
            print("Connected to the flight log database")
        except Exception as e:
            print(f"Failed to connect to the database: {e}")
            raise

    def log_event(self, flight_id, description, vehicle=None):
        log_entry = {
            "flight_id": flight_id,
            "timestamp": datetime.now(),
            "description": description,
            "altitude": vehicle.location.global_relative_frame.alt if vehicle else None,
            "battery": vehicle.battery.level if vehicle else None,
            "mode": vehicle.mode.name if vehicle else None
        }
        self.logs.insert_one(log_entry)
        print(f"Event recorded: {description}")

    def save_offline(self, log_entry):
        try:
            if os.path.exists(OFFLINE_LOG_FILE):
                with open(OFFLINE_LOG_FILE, 'r') as file:
                    offline_logs = json.load(file)
            else:
                offline_logs = []
            offline_logs.append(log_entry)
            with open(OFFLINE_LOG_FILE, 'w') as file:
                json.dump(offline_logs, file, indent=4)
            print("Event saved offline")
        except Exception as e:
            print(f"Failed to save offline log: {e}")

    def sync_offline_logs(self):
        if os.path.exists(OFFLINE_LOG_FILE):
            with open(OFFLINE_LOG_FILE, 'r') as file:
                offline_logs = json.load(file)
            for log_entry in offline_logs:
                try:
                    self.logs.insert_one(log_entry)
                    print(f"Synced offline log: {log_entry['description']}")
                except Exception as e:
                    print(f"Failed to sync log: {e}")
                    return
            os.remove(OFFLINE_LOG_FILE)
            print("Offline logs synced successfully")

    def close(self, client: MongoClient):
        client.close()
