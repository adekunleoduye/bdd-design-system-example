import React, {useState} from 'react'
import cn from 'classnames';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Loading from '../Loading'

import {IoPencil, IoAddCircleSharp} from "react-icons/io5";
import getSymbolFromCurrency from 'currency-symbol-map'
import {getAllInfoByISO} from 'iso-country-currency';

import CURRENCY_DATA from './fixtures/rates.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CurrencyConverter.module.scss'

 const {rates: RATES, updated} = CURRENCY_DATA;

const updatedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: true,
  timeZone: 'America/Los_Angeles'
}).format(updated * 1000);

export const CurrencyItem = ({countryCode, setBaseValue, baseValue}) => {
  const { currency, countryName, iso} = getAllInfoByISO(countryCode);

  function handleChange(e) {
    setBaseValue(e.target.value)
  }

  return (

    <div className={styles.currencyItem}>
      <div className={styles.flagWrapper}>
        <img 
        className={styles.flag} 
        src={`https://flagcdn.com/${iso.toLowerCase()}.svg`} 
        alt="USA Flag" />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.nameShort}>
          {currency}
        </div>
        <div className={styles.nameLong}>
          {countryName}
        </div>
      </div>
      <div className={styles.valueWrapper}>
        {currency === "USD" ? 
          (
            <InputGroup className={cn(styles.currencyInput)} >
              <InputGroup.Text>$</InputGroup.Text>
              <FormControl aria-label="Amount (to the nearest dollar)" defaultValue={RATES[currency]} onChange={handleChange} />
            </InputGroup>
          ) : (
            <>
              <div className={styles.currencyValue}>
                {getSymbolFromCurrency('USD')} {(RATES[currency] * baseValue).toFixed(2)}
              </div>
              <div className={styles.currencyConversion}>
                1 USD = {RATES[currency]} {currency}
              </div>
            </>
         )}
      </div>
    </div>
  )
}


export default function CurrencyConverter({loading = false}) {
  const [isLoading,] = useState(loading);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyList, ] = useState(["US", "CA"]);
  // const [baseCountry, setBaseCountry] = useState('United States');
  // const [baseCurrency, setBaseCurrency] = useState('USD');
  const [baseValue, setBaseValue] = useState(1)

  // useEffect(() => {
  //   setLoading(false)
  // }, [])

  
  return (
    <div className={cn(styles.root, {
      [styles.isLoading]: isLoading
    })}>
      {isLoading ? 
        (<div>
          <Loading />
          <p className="mt-3">Loading</p>
        </div>) : (
          <>
            <header className={styles.header}>
              <div>
                <h1 className={styles.title}>Currency Converter</h1>
                <span className={styles.date}>Updated: {updatedDate}</span>
              </div>
              <div>
                <Button variant="secondary" className={styles.editBtn}><IoPencil /></Button>
              </div>
            </header> 
            <div className={styles.CurrencyGroup} aria-label="currency list">
              {currencyList.map((countryIso) => (
                <CurrencyItem key={countryIso} countryCode={countryIso} setBaseValue={setBaseValue} baseValue={baseValue} />
              ))}
            </div>
            <footer className={cn(styles.footer, "d-grid","gap-2")}>
              <Button variant="primary" className={styles.addCurrencyBtn}>
                <span>
                  <IoAddCircleSharp /> Add Currency
                </span>
              </Button>
              <Form.Group>
                <Form.Label>Add Currency</Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="currency search"
                  onChange={setSelectedCurrency}
                  options={Object.keys(RATES)}
                  placeholder="Choose a currency..."
                  selected={selectedCurrency}
                />
              </Form.Group>
            </footer>
          </>
        )}
    </div>
  )
}
