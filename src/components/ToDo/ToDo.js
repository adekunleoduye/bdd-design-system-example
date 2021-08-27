import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, InputGroup, FormControl, Form, ProgressBar } from 'react-bootstrap';
import { IoCloseCircle } from "react-icons/io5";

import styles from './ToDo.module.scss';

// Remove dependence on setCompletedTasks
function ToDoItem({label, setTasks, tasks, setCompletedTasks, id}) {

  function handleOnChange(e) {
    setTasks((prevState) => {
    const newState = prevState;
    const findTaskIndex = newState.findIndex((task) => (task.name === label));
    newState[findTaskIndex].completed = e.target.checked
    setCompletedTasks(newState.filter((task) => (task.completed === true)).length)
    return newState
    })
  }

  function handleOnDelete() {
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }))
  }
  
  return (  
    <Form.Group className={styles.rootItem} id={id}> 
      <Form.Check 
          className={styles.taskCheckbox}
          type={"checkbox"}
          id={label}
          label={label}
          onChange={handleOnChange}
        />

        <Button variant="secondary" className={styles.deleteBtn}
         onClick={handleOnDelete}
         >
          <span className="screen-reader-text">delete {label}</span>
          <IoCloseCircle />
        </Button>
    </Form.Group>
  )
}

function ToDo({tasks = []}) {
  const [value, setValue] = useState('');
  const [currentTasks, setTasks] = useState(tasks.map((task) => ({name: task, completed: false, id: uuid()})));
  const [completedTasks, setCompletedTasks] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    // Resets completed tasks when task is 0
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
            if(!value){
              return;
            }
            setTasks([...currentTasks, {name: value, completed: false, id: uuid()}]);
            setValue('');
          }}>
            Add
          </Button>
        </InputGroup>
      </div>
      <div className={styles.content}>
      {currentTasks.length === 0 ? (<div className={styles.emptyStateWrapper}><p>You have no tasks at the moment.</p></div>): (
      <Form className={styles.todoList}>
        {
          currentTasks.map((task) => {
            return <ToDoItem label={task.name} key={task.id} id={task.id} setTasks={setTasks} tasks={currentTasks} setCompletedTasks={setCompletedTasks} />
          })
        }
      </Form>
      )}
      {(currentTasks.length > 0) && <footer className={styles.footer}>
        <div>
          <span className={styles.completedPercentage}>
            {Math.round((completedTasks / currentTasks.length) * 100)}% 
            <span className="screen-reader-text">{Math.round((completedTasks / currentTasks.length) * 100)}%  tasks completed</span>
          </span>
        </div>
        <div className={styles.progressWrapper}>
          <ProgressBar variant="success" now={(completedTasks / currentTasks.length) * 100}  />
        </div>
      </footer>}
      </div>
    </div>
  )
}

export default ToDo;
