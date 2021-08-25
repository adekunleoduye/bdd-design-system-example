import React from 'react';

import ToDo from './ToDo';

export default {
  title: 'Components/ToDo',
  component: ToDo,
};

const Template = (args) => ( <ToDo {...args} /> )

export const Default = Template.bind({});

export const WithATask = Template.bind({});

WithATask.args = {
  tasks: ["Eat Cookies"],
}
export const WithMultipleTask = Template.bind({});

WithMultipleTask.args = {
  tasks: ["Eat Cookies", "Drink Milk"],
}