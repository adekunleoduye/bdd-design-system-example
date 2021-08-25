import React, {useState, useRef, useEffect} from 'react';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, InputGroup, FormControl, Form, ProgressBar } from 'react-bootstrap';
import { IoCloseCircle } from "react-icons/io5";

import styles from './ToDo.module.scss';

function ToDoItem({label, setTasks, tasks, setCompletedTasks}) {

  function removeTask() {
    return tasks.filter((task) => {
      return task.name !== label
    })
  }
  
  return (  
    <li className={styles.rootItem}> 
      <Form.Check 
          className={styles.taskCheckbox}
          type={"checkbox"}
          id={label}
          label={label}
          onChange={(e) => {
           setTasks((prevState) => {
            const newState = prevState;
            const findTaskIndex = newState.findIndex((task) => (task.name === label));
            newState[findTaskIndex].completed = e.target.checked
            setCompletedTasks(newState.filter((task) => (task.completed === true)).length)
            return newState
           })
          }}
        />

        <Button variant="secondary" className={styles.deleteBtn}
         onClick={() => {
           setTasks(removeTask)
          }}
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
  const [completedTasks, setCompletedTasks] = useState(0);

  const inputRef = useRef();

  
  useEffect(() => {
    console.log({completedTasks, currentTasks: currentTasks.length});
    if(currentTasks.length === 0) {
      setCompletedTasks(0)
    }
  }, [completedTasks, currentTasks])



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
            value={value}
          />
          <Button variant="primary" id="addTaskBtn" onClick={() => {
            setTasks([...currentTasks, {name: value, completed: false, id: uuid()}]);
            setValue('');
          }}>
            Add
          </Button>
        </InputGroup>
      </div>
      {currentTasks.length === 0 ? (<div className={styles.emptyStateWrapper}><p>You have no tasks at the moment.</p></div>): (<ul className={styles.todoList}>
        {
          currentTasks.map((task) => {
            return <ToDoItem label={task.name} key={task.id} setTasks={setTasks} tasks={currentTasks} setCompletedTasks={setCompletedTasks} />
          })
        }
      </ul>)}
      {(currentTasks.length > 0) && <footer className={styles.footer}>
        <div>
          <span className={styles.completedPercentage}>
            {Math.round((completedTasks / currentTasks.length) * 100)}% 
            <span className="screen-reader-text">{Math.round((completedTasks / currentTasks.length) * 100)}%  tasks completed</span>
          </span>
        </div>
        <div className={styles.progressWrapper}>
          <ProgressBar now={(completedTasks / currentTasks.length) * 100}  />
        </div>
      </footer>}
    </div>
  )
}

export default ToDo;
