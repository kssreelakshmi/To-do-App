import React, { useState } from 'react'
import BackgroundImage from './assets/BackgroundImage.jpg'
import {RiCloseCircleLine} from 'react-icons/ri'
import { TiEdit } from "react-icons/ti";
import {AiOutlineDelete} from 'react-icons/ai'
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState({
    status: false,
    index: null
  });


  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {

    if (newTask.trim() !== "") {
      if (!edit.status) {
        setTasks((prev)=>
           [...prev,{
            data : newTask,
            id : Date.now()
          }]
        );

      }
      else {
        const updatedTask = [...tasks];
        updatedTask[edit.index] = {
          ...updatedTask[edit.index],
          data: newTask,
        };
        setTasks(updatedTask);
        setEdit({
          status: false,
          index: null
        })
      }
      setNewTask('');
    }
  }

  function editTask(e,index) { 

    e.stopPropagation();
    setNewTask(tasks[index]?.data)
    setEdit({
      status: true,
      index: index,

    });
  }

  function deleteTask(e,index) {
    e.stopPropagation();
    const updatedTask = tasks.filter((tas, idx) => tas.id !== index)
    setTasks(updatedTask);
  }


  function moveTaskUp(e,index) {
    e.stopPropagation();
    if (index > 0) {
      const updatedTask = [...tasks];
      console.log(index);
      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]]
      setTasks(updatedTask);
    }
  }

  function moveTaskDown(e,index) {
    e.stopPropagation();
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

  const checkInput = (index) =>{
    const value = tasks.map((element,idx)=> {
      if(element.id === index){
        element.isCompleted = !element.isCompleted
      }
      return element
    }
    );
    setTasks(value);
}

  return (
    <div className='container' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='to-do-list'>

        <h1>Memorize</h1>
        <div>
          <input type="text" placeholder='Enter a task...'
            value={newTask} onChange={handleInputChange} />
          <button className='add-button' onClick={addTask}>{!edit.status ? <MdAddBox /> : <TbEdit />}</button>
          <button className='remove-button' onClick={() => removeAll()}><AiOutlineDelete /></button>
          {/* <button className='check-all' onClick={() => checkAll()}>Completed</button> */}
        </div>
        <ol>

          <div></div>
          {tasks.map((task, index) =>
            <li key={index } onClick={() =>  checkInput(task.id)} style={{backgroundColor : task.isCompleted?'green':'red'}}>
              <span className='text'>{task.data} </span>
              <button className='delete-button' onClick={(e) => deleteTask(e,task.id)}><RiCloseCircleLine /></button>
              <button className='edit-button' onClick={(e) => editTask(e,index)}><TiEdit /></button>
              <button className='moveup-button' onClick={(e) => moveTaskUp(e,index)}><IoIosArrowRoundUp /></button>
              <button className='movedown-button' onClick={(e) => moveTaskDown(e,index)}><IoIosArrowRoundDown /></button>
              
                
                


            </li>
          )}

        </ol>
      </div>
    </div>

  )
}
export default ToDoList;