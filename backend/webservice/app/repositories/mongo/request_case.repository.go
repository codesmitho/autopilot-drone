package mongo

type RequestCaseRepository struct{}

func NewRequestCaseRepository() *RequestCaseRepository {
	return &RequestCaseRepository{}
}

func (r RequestCaseRepository) CreateIndex() {}

func (r RequestCaseRepository) Create() {}

func (r RequestCaseRepository) GetByID() {}

func (r RequestCaseRepository) List() {}

func (r RequestCaseRepository) UpdateByID() {}

func (r RequestCaseRepository) DeleteByID() {}
