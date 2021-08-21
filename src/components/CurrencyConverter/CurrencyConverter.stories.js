import React from 'react';

import CurrencyConverter from './CurrencyConverter';

export default {
  title: 'Components/CurrencyConverter',
  component: CurrencyConverter,
};

const Template = (args) => ( <CurrencyConverter {...args} /> )

export const Default = Template.bind({});


export const Loading = Template.bind({});

Loading.args = {
  loading: true
}