import React, { useState ,useEffect,useRef } from 'react'
import './App.css'

const TodoForm = (props) => {
    const [input,setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(()=>{
      inputRef.current.focus()
    })
    
    const handleInputChange = (e) =>{
      setInput(e.target.value)

    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        props.onSubmit({
          id : Math.floor(Math.random()*10000),
          input :input,
        });
        setInput('');

    }

  return (
  <form className='todo-form' onSubmit={handleSubmit()}>
    <input type="text" placeholder='Add a todo' value={input} className='todo-input' onChange={handleInputChange()} ref = {inputRef} />
    <button className='todo-submit'>Add</button>

  </form>
  )
}

export default TodoForm