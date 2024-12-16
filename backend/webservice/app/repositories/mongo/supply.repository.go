package mongo

type SupplyRepository struct{}

func NewSupplyRepository() *SupplyRepository {
	return &SupplyRepository{}
}

func (r SupplyRepository) CreateIndex() {}

func (r SupplyRepository) Create() {}

func (r SupplyRepository) GetByID() {}

func (r SupplyRepository) List() {}

func (r SupplyRepository) UpdateByID() {}

func (r SupplyRepository) DeleteByID() {}
