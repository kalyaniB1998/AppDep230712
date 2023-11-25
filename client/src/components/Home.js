import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Home() {
  let dispatch= useDispatch();
  let storeObj = useSelector((store)=>{
    return store;
  });
  console.log(storeObj);
  return (
    <div className='App'>
      <TopNavigation></TopNavigation>
        <h1>Home</h1>
        <h2>Hi,Welcome to {storeObj.userReducer.loginDetails.firstName}  {storeObj.userReducer.loginDetails.lastName}</h2>
        <img className='img' src={`http://localhost:8899/${storeObj.userReducer.loginDetails.profilePic}`}></img>
      
      <div>
        <button onClick={()=>{
          dispatch({type:"addTask",data:1})
        }}>Add task</button>
        <button onClick={()=>{
          dispatch({type:"editTask",data:1})
        }}>Edit task</button>
        <button onClick={()=>{
          dispatch({type:"removeTask",data:1})
        }}>Remove task</button>
        <button onClick={()=>{
          dispatch({type:"deleteTask",data:1})
        }}>Delete task</button>
        <button onClick={()=>{
          dispatch({type:"addLeave",data:1})
        }}>Add Leave</button>
        <button onClick={()=>{
          dispatch({type:"editLeave",data:1})
        }}>Edit Leave</button>
        <button onClick={()=>{
          dispatch({type:"cancelLeave",data:1})
        }}>cancel Leave</button>
        <button onClick={()=>{
          dispatch({type:"deleteLeave",data:1})
        }}>Delete Leave</button>
      </div>


    </div>
  )
}

export default Home