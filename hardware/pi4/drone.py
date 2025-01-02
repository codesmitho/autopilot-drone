from dronekit import connect, VehicleMode
import time
import uuid


class Drone:
    def __init__(self, vehicle_connection: str, logger):
        self.flight_id = str(uuid.uuid4())
        self.logger = logger
        
        print(f"🛫 Starting flight session with ID: {self.flight_id}")
        
        try:
            print(f"🔗 Connecting to the drone using {vehicle_connection}")
            self.vehicle = connect(vehicle_connection, wait_ready=True)
            print("✅ Drone connection successful 🚀")
            self.logger.log_event(self.flight_id, "✅ Drone connection successful 🚀")

        except Exception as e:
            error_message = f"❌ Failed to connect to the drone: {e} ⚠️"
            print(error_message)
            self.logger.log_event(self.flight_id, error_message)
            raise ConnectionError(error_message)

    def arm_and_takeoff(self, target_altitude):
        print("🛠️ Getting drone ready for takeoff...")
        self.logger.log_event(self.flight_id, "🛠️ Drone preparing for takeoff", self.vehicle)
        
        while not self.vehicle.is_armable:
            time.sleep(1)

        self.vehicle.mode = VehicleMode("GUIDED")
        self.vehicle.armed = True
        self.logger.log_event(self.flight_id, "🔒 Drone is armed", self.vehicle)

        while not self.vehicle.armed:
            time.sleep(1)

        print(f"⏫ Ascending to {target_altitude} meters")
        self.logger.log_event(self.flight_id, f"⏫ Taking off to {target_altitude} meters", self.vehicle)
        self.vehicle.simple_takeoff(target_altitude)

        while True:
            if self.vehicle.location.global_relative_frame.alt >= target_altitude * 0.95:
                print("🏁 Reached target altitude ✅")
                self.logger.log_event(self.flight_id, "🏁 Target altitude achieved", self.vehicle)
                break
            time.sleep(1)

    def hold_altitude(self):
        self.vehicle.mode = VehicleMode("ALT_HOLD")
        print("🛑 Maintaining current altitude")
        self.logger.log_event(self.flight_id, "🛑 Altitude hold mode activated", self.vehicle)
        time.sleep(5)

    def land(self):
        print("🪂 Starting landing process...")
        self.logger.log_event(self.flight_id, "🪂 Landing initiated", self.vehicle)
        self.vehicle.mode = VehicleMode("LAND")
        while self.vehicle.armed:
            time.sleep(1)
        print("✅ Drone has landed successfully 🛬")
        self.logger.log_event(self.flight_id, "✅ Landing completed", self.vehicle)

    def execute_flight(self):
        try:
            self.logger.log_event(self.flight_id, "🚀 Flight operation started", self.vehicle)
            self.arm_and_takeoff(10)
            self.hold_altitude()
            time.sleep(10)
            self.land()
        except KeyboardInterrupt:
            print("🛑 Flight operation stopped by user ⚠️")
            self.logger.log_event(self.flight_id, "🛑 Flight operation stopped by user", self.vehicle)
            self.land()
        except Exception as e:
            error_message = f"❌ Error occurred during flight: {e} ⚠️"
            print(error_message)
            self.logger.log_event(self.flight_id, error_message, self.vehicle)
            self.land()
        finally:
            self.close()

    def close(self):
        try:
            self.logger.log_event(self.flight_id, "🛑 Shutting down drone session", self.vehicle)
            self.vehicle.close()
            print("🔒 Flight session closed ✅")
        except Exception as e:
            error_message = f"❌ Failed to close drone connection: {e} ⚠️"
            print(error_message)
            self.logger.log_event(self.flight_id, error_message)
