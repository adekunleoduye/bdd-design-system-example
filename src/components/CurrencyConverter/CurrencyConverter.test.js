import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Default, Loading} from './CurrencyConverter.stories.js'


describe('Currency Converter', () => {
  it('should render', async () => {
    render(<Default />)

    const actual = await screen.findByText("Currency Converter");
    expect(actual).toBeTruthy();
  })
  it('should render loading state', () => {
    render(<Loading {...Loading.args} />)

    const actual = screen.getByText("Loading");
    expect(actual).toBeTruthy();
  })
  
  describe('When the user adds a currency', () => {
    it('currency list should increases by 1', async () => {
      render(<Default />)
      const list = screen.getByLabelText("currency list")
      expect(list.childNodes.length).toBe(3);
      // list.children.length
      // const actual = ;
      // expect(actual).toHaveLength();
    })
  })
  
  describe('When the user removes a currency', () => {
    it.todo('currency list should decrease by 1')
  })
  
  describe('When the rates are unavailable', () => {
    it.todo('should render the error state')
  })  
  
})
