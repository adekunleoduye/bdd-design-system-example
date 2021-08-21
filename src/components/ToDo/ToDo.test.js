import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Default} from './Todo.stories.js'


describe('ToDo', () => {
  it('should render', () => {
    render(<Default />)

    const actual = screen.getByText("ToDo");
    expect(actual).toBeVisible();
  })
  describe('When the user adds a new task', () => {
    it.todo("should increase tasks list by 1")
  })
  describe('When the user removes a task', () => {
    it.todo("should decrease tasks list by 1")
  })
  describe('When the user completes a task', () => {
    it.todo("should increase completed tasks list by 1")
  })
  describe('When there are no tasks', () => {
    it.todo("should display a empty state message")
  })   
})
