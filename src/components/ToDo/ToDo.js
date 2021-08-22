import React, {useState, useRef, useEffect} from 'react';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { IoCloseCircle } from "react-icons/io5";

import styles from './ToDo.module.scss';

function ToDoItem({label, setTasks, tasks}) {
  
  return (  
    <li className={styles.rootItem}> 
      <Form.Check 
          className={styles.taskCheckbox}
          type={"checkbox"}
          id={label}
          label={label}
        />

        <Button variant="secondary" className={styles.deleteBtn}
        //  onClick={() => setTasks(tasks)}
         >
          <span className="screen-reader-text">delete {label}</span>
          <IoCloseCircle />
        </Button>
    </li>
  )
}

function ToDo({tasks = []}) {
  const [value, setValue] = useState('');
  const [currentTasks, setTasks] = useState(tasks.map((task) => ({name: task, completed: false, id: uuid()})));

  const inputRef = useRef();

  
  // useEffect(() => {
  //   console.log(value);
  // }, [value])
  
  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks])

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
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="primary" id="addTaskBtn" onClick={() => setTasks([...tasks, {name: value, completed: false, id: uuid()}])} >
            Add
          </Button>
        </InputGroup>
      </div>
      <ul className={styles.todoList}>
        {
          currentTasks.map((task) => {
            return <ToDoItem label={task.name} key={task.name} setTasks={setTasks} tasks={currentTasks} />
          })
        }
      </ul>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}

export default ToDo;
