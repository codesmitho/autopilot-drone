from pymongo import MongoClient
from config import DRONE_CONNECTION, MONGODB_URI, DATABASE_NAME, LOG_COLLECTION
from logger import DatabaseLogger
from drone import Drone

if __name__ == '__main__':
    mongo_client = MongoClient(MONGODB_URI)
    logger = DatabaseLogger(mongo_client, DATABASE_NAME, LOG_COLLECTION)
    drone = Drone(vehicle_connection=DRONE_CONNECTION, logger=logger)
    
    try:
        drone.execute_flight()
    finally:
        logger.close(mongo_client)
