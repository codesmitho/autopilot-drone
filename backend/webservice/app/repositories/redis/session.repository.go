package mongo

type SessionRepository struct{}

func (r SessionRepository) CreateSession() {}

func (r SessionRepository) ExpireSession() {}

func (r SessionRepository) GetSession() {}
