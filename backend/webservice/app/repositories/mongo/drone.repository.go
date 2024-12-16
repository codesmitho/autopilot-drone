package mongo

type DroneRepository struct{}

func NewDroneRepository() *DroneRepository {
	return &DroneRepository{}
}

func (r DroneRepository) CreateIndex() {}

func (r DroneRepository) Create() {}

func (r DroneRepository) GetByID() {}

func (r DroneRepository) List() {}

func (r DroneRepository) UpdateByID() {}

func (r DroneRepository) DeleteByID() {}
