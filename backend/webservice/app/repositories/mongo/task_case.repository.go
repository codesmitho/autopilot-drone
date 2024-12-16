package mongo

type TaskCaseRepository struct{}

func NewTaskCaseRepository() *RequestCaseRepository {
	return &RequestCaseRepository{}
}

func (r TaskCaseRepository) CreateIndex() {}

func (r TaskCaseRepository) Create() {}

func (r TaskCaseRepository) GetByID() {}

func (r TaskCaseRepository) List() {}

func (r TaskCaseRepository) UpdateByID() {}

func (r TaskCaseRepository) DeleteByID() {}
