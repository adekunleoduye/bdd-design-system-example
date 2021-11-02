import React from 'react';

import Magnify from './Magnify';

import lowRes from './mg_low_res.jpeg';
import highRes from './mg_high_res.jpeg';

export default {
  title: 'Components/Magnify',
  component: Magnify,
};

const Template = (args) => ( <Magnify {...args} /> )

export const Default = Template.bind({
  lowResSrc: lowRes, 
  highResSrc: highRes
});
