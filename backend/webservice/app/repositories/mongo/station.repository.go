package mongo

type StationRepository struct{}

func NewStationRepository() *StationRepository {
	return &StationRepository{}
}

func (r StationRepository) CreateIndex() {}

func (r StationRepository) Create() {}

func (r StationRepository) GetByID() {}

func (r StationRepository) List() {}

func (r StationRepository) UpdateByID() {}

func (r StationRepository) DeleteByID() {}
