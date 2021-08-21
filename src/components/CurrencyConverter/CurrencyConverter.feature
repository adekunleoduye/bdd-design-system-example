Feature: Currency Converter

  Scenario: Add Currency
    Given Currency Converter
     When the currency gets rendered
      Then it should default to the loading state
     When the user adds a currency
      Then the currency list should increases by 1
     When the user removes a currency
      Then the currency list should decrease by 1
     When the rates are unavailable 
      Then it should render the error state