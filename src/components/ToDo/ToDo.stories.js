import React from 'react';

import ToDo from './ToDo';

export default {
  title: 'Components/ToDo',
  component: ToDo,
};

const Template = (args) => ( <ToDo {...args} /> )

export const Default = Template.bind({});

export const WithOneTask = Template.bind({});

WithOneTask.args = {
  tasks: ["Eat Cookies"],
}