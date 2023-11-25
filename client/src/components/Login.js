import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import{useDispatch} from "react-redux";

function Login () {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let inputOnFocus=(inputRef)=>{
      inputRef.current.style.backgroundColor = "skyblue";
     }
     let inputOnBlur= (inputRef)=>{
      inputRef.current.style.backgroundColor = "";
  }

    useEffect(()=>{
      // validateTokenFromServer();
      // console.log(localStorage.getItem("email"));
      // console.log(localStorage.getItem("password"));

      // if(localStorage.getItem("email") && localStorage.getItem("password")){
      //   emailInputRef.current.value = localStorage.getItem("email");
      //   passwordInputRef.current.value = localStorage.getItem("password");
      //   validateLoginFromServer();
      // }
     
    },[]);

  //  let validateTokenFromServer = async()=>{
    
  //   if(localStorage.getItem("token")){
  //     let dataToSend = new FormData();
  //     dataToSend.append("token",localStorage.getItem("token"));
  
  //     let reqOptions={
  //       method:"POST",
  //       body:dataToSend,
  //     };
  
  //     let JSONData = await fetch("/validateToken",reqOptions);
  //      let JSOData = await JSONData.json();

  //      if(JSOData.status==="failure"){
  //       alert(JSOData.msg);
  //     }else{
  //        dispatch({type:"login",data:JSOData.data[0]});
  //       navigate("/home");
  //     }
  //      console.log(JSOData);
  //    }
  //  };

//  let validateLoginFromServer =async()=>{
//     let dataToSend = new FormData();
//     dataToSend.append("email",emailInputRef.current.value);
//     dataToSend.append("password",passwordInputRef.current.value);


//     let reqOptions ={
//       method:"POST",
//       body:dataToSend,
//     };

//     let JSONdata = await fetch("/validateLogin",reqOptions);
//     let JSOData = await JSONdata.json();
//     if(JSOData.status==="failure"){
//       alert(JSOData.msg);
//     }else{
//       // localStorage.setItem("email",emailInputRef.current.value);
//       // localStorage.setItem("password",passwordInputRef.current.value);
//      localStorage.setItem("token",JSOData.token);
//      console.log(JSOData);
//       dispatch({type:"login",data:JSOData.data[0]});
//       navigate("/home");
//     }
//   };
  let validateLogin =()=>{
   return async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);


    let reqOptions ={
      method:"POST",
      body:dataToSend,
    };

    let JSONdata = await fetch("/validateLogin",reqOptions);
    let JSOData = await JSONdata.json();
    if(JSOData.status==="failure"){
      alert(JSOData.msg);
    }else{
      // localStorage.setItem("email",emailInputRef.current.value);
      // localStorage.setItem("password",passwordInputRef.current.value);
     localStorage.setItem("token",JSOData.token);
     console.log(JSOData);
     dispatch({type:"login",data:JSOData.data[0]});
      navigate("/home");
    }
   }
  }
   

  return (
    <div className='App'> 
      <form>
        <h1>Login</h1>
        <div>
                    {/* <label>Email</label> */}
                    <input ref={emailInputRef}
                     onFocus={()=>{inputOnFocus(emailInputRef);}}
                     onBlur={()=>{inputOnBlur(emailInputRef)}} placeholder='Enter Email'></input>
                </div>
                <div>
                    {/* <label>Password</label> */}
                    <input ref={passwordInputRef} type='password'
                     onFocus={()=>{inputOnFocus(passwordInputRef);}}
                     onBlur={()=>{inputOnBlur(passwordInputRef)}} placeholder='Enter Password'></input>
                </div>
                <div>
                  <button type='button' onClick={()=>{
                    // validateLoginFromServer();
                    dispatch(validateLogin());
                  }}>Login</button>
                </div>
                </form>
                <br></br>
                <Link className='Link' to="/Signup">Signup</Link>
    </div>
  )
}

export default Login 