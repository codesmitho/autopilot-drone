package controllers

type CaseController struct{}

func NewCaseController() *CaseController {
	return &CaseController{}
}

func (c CaseController) CreateCase() {}

func (c CaseController) ApproveCase() {}

func (c CaseController) DiscardCase() {}

func (c CaseController) UpdateCase() {}

func (c CaseController) SubmitAndCreateTask() {}

func (c CaseController) CancelTask() {}

func (c CaseController) GetCaseByID() {}

func (c CaseController) ListCases() {}
