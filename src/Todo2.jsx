import React, { useState } from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import { TiEdit } from "react-icons/ti";
import {AiOutlineDelete} from 'react-icons/ai'
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import './App.css'



function Todo2({todos,complteteTodo,removeTodo,updateTodo}){
    const [edit,setEdit] = useState({
        id : null ,
        value : ""
    })
    
    const submitEdit = (value) =>{
        updateTodo(edit.id,value)
        setEdit({
            id: null,
            value : ''
        })
    }
    if(edit.id){
        return<TodoForm edit = {edit} onSubmit = {submitEdit}/>
    }

    return(
        todos.map((todo,index)=>{
            <div className={todo.isComplete ?'todo-row-complete' :'todo-row'} key={index}>
               <div key={todo.id} onClick={()=>complteteTodo(todo.id)}>
               {todo.text}
               </div>
               <div className='icons'>
                <RiCloseCircleLine onClick={()=>{removeTodo(todo.id)}} className='delete-icon'/>
                <TiEdit onClick={()=>{setEdit({id :todo.id, value :todo.text})}} className='edit-icon' />
                <IoIosArrowRoundUp onClick={()=>{removeTodo(todo.id)}} className='delete-icon' />
                <IoIosArrowRoundDown onClick={()=>{removeTodo(todo.id)}} className='delete-icon'/>
                <AiOutlineDelete />
               </div>
            </div>
            })
    )
}

export default Todo2