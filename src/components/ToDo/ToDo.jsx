import React from 'react';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, InputGroup, FormControl, Dropdown, Form } from 'react-bootstrap';


import styles from './ToDo.module.scss';

function ToDoItem({label, id}) {
  
  return (  
    <Form.Check 
    className={styles.rootItem}
        type={"checkbox"}
        id={id}
        label={label}
      />
  )
}

function ToDo() {
  // const uuid
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h3>ToDo</h3>
      </header>
      <div className={styles.addWrapper}>
        <InputGroup>
          <FormControl
            placeholder="Add a new task..."
            aria-label="Add a new task..."
            aria-describedby="addTaskBtn"
          />
          <Button variant="primary" id="addTaskBtn">
            Add
          </Button>
        </InputGroup>
      </div>
      <ul className={cn(styles.todoList, "p")}>
        List
      </ul>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}

export default ToDo;
