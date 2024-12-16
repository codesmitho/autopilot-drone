package mongo

type UserRepository struct{}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r UserRepository) CreateIndex() {}

func (r UserRepository) Create() {}

func (r UserRepository) GetByID() {}

func (r UserRepository) List() {}

func (r UserRepository) UpdateByID() {}

func (r UserRepository) DeleteByID() {}
