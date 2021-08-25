import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Default, WithATask, WithMultipleTask} from './Todo.stories.js'


describe('ToDo', () => {
  it('should render', () => {
    render(<Default />)

    const actual = screen.getByText("ToDo");
    expect(actual).toBeInTheDocument();
  })
  describe('When the user adds a new task', () => {
    it("should appear in task list",  () => {
      render(<Default />)
      
      userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Eat Cookies')
      userEvent.click(screen.getByRole('button', { name: /add/i}))

      const actual =  screen.getByRole('checkbox', { name: /Eat Cookies/i })
      expect(actual).toBeInTheDocument();
    })
  })
  describe('When the user removes a task', () => {
    it("should be removed from task list", () => {
      render(<WithATask {...WithATask.args} />)

      const task =  screen.getByRole('checkbox', { name: /Eat Cookies/i })
      expect(task).toBeInTheDocument();
      userEvent.hover(task)
      userEvent.click(screen.getByRole("button", { name: /delete eat cookies/i } ))
      expect(task).not.toBeInTheDocument();
    })
  })
  describe('When the user completes  a task', () => {
    it("should be mark completed", () => {
      render(<WithMultipleTask {...WithMultipleTask.args}  />)

      const task =  screen.getByRole('checkbox', { name: /Eat Cookies/i })
      const originalPercentage =  screen.getByText(/0% tasks completed/i)
      expect(originalPercentage).toBeInTheDocument();
      userEvent.click(task)
      const updatedPercentage =  screen.getByText(/50% tasks completed/i)
      expect(updatedPercentage).toBeInTheDocument();
    })
  })
  describe('When there are no tasks', () => {
    it("should display a empty state message", () => {
      render(<Default  />)
      const actual = screen.getByText('You have no tasks at the moment.');

      expect(actual).toBeInTheDocument();
    })
  })   
})
