import React, { useEffect, useState } from 'react'
import BackgroundImage from './assets/BackgroundImage.jpg'


function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState({
    status: false,
    index: null
  });
  const [input, SetInput] = useState({
    status: false,
    index: null
  })


  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {

    if (newTask.trim() !== "") {
      if (!edit.status) {
        setTasks([...tasks, newTask]);

      }
      else {
        const updatedTask = [...tasks];
        updatedTask[edit.index] = newTask
        setTasks(updatedTask);
        setEdit({
          status: false,
          index: null
        })
      }
      setNewTask('');
    }
  }

  // function checkInput(index) {
  //   const updatedTasks = 
    
 
  // }

  function editTask(index) {
    setNewTask(tasks[index])
    setEdit({
      status: true,
      index: index,

    });
  }

  function deleteTask(index) {
    const updatedTask = tasks.filter((_, idx) => idx !== index)
    setTasks(updatedTask);
  }


  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]]
      setTasks(updatedTask);
    }
  }

  function moveTaskDown(index) {

    if (index < tasks.length - 1) {

      const updatedTask = [...tasks]
      let temp = updatedTask[index]
      updatedTask[index] = updatedTask[index + 1]
      updatedTask[index + 1] = temp
      setTasks(updatedTask);
    }
  }

  function removeAll() {
    setTasks([])

  }



  return (
    <div className='container' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='to-do-list'>

        <h1>Memorize</h1>
        <div>
          <input type="text" placeholder='Enter a task...'
            value={newTask} onChange={handleInputChange} />
          <button className='add-button' onClick={addTask}>{!edit.status ? "Add" : "Edit"}</button>
          <button className='remove-button' onClick={() => removeAll()}>Remove All</button>
        </div>
        <ol>

          <div></div>
          {tasks.map((task, index) =>
            <li key={index}>
              <input type="checkbox" className='check-input' onChange={() => checkInput()} />
              <span className='text'>{task}</span>
              <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
              <button className='edit-button' onClick={() => editTask(index)}>Edit</button>
              <button className='moveup-button' onClick={() => moveTaskUp(index)}>Move Up</button>
              <button className='movedown-button' onClick={() => moveTaskDown(index)}>Move Down</button>
            </li>
          )}

        </ol>
      </div>
    </div>

  )
}
export default ToDoList;