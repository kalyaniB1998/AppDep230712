import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
    let navigate= useNavigate();
    let storeObj = useSelector((store)=>{
        return store});
        useEffect(()=>{
            if(storeObj && storeObj.userReducer.loginDetails && storeObj.userReducer.loginDetails.firstName){
            }else{
             navigate("/");   
            }},[]);


            let deleteUserFromServer= async(req,res)=>{
              let url = `http://localhost:8899/deleteUser?email=${storeObj.userReducer.loginDetails.email}`

              let reqOptions={
                method:"DELETE"
              }
              
             let JSONdata =await fetch(url,reqOptions);
             let JSOData = await JSONdata.json();
             alert(JSOData.msg);
             if(JSOData.status==="success"){
              navigate("/");
             }
            }
 return (
    <nav>
<NavLink to="/Home">Home</NavLink>
<NavLink to="/EditProfile">Edit Profile </NavLink>
<NavLink onClick={()=>{
deleteUserFromServer();
}}>Delete</NavLink>
<NavLink to="/" onClick={()=>{
  localStorage.clear();
}}>Logout</NavLink>
    </nav>
  )
}

export default TopNavigation