package context

type AppContext struct{}

func New() *AppContext {
	return &AppContext{}
}
