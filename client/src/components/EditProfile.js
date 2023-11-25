import React ,{ useEffect, useRef, useState }from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
    
        let firstNameInputRef = useRef();
        let lastNameInputRef = useRef();
        let ageInputRef = useRef();
        let emailInputRef = useRef();
        let passwordInputRef = useRef();
        let profilePicInputRef = useRef();
        let [imageURL,setImageURL]=useState("/images/Profile.png");
        let inputOnFocus=(inputRef)=>{
            inputRef.current.style.backgroundColor = "skyblue";
           }
           let inputOnBlur= (inputRef)=>{
            inputRef.current.style.backgroundColor = "";
        }

        let storeObj = useSelector((store)=>{return store})

        useEffect(()=>{
            console.log(storeObj)
            firstNameInputRef.current.value = storeObj.userReducer.loginDetails.firstName;
            lastNameInputRef.current.value =  storeObj.userReducer.loginDetails.lastName;
            ageInputRef.current.value =  storeObj.userReducer.loginDetails.age;
             emailInputRef.current.value =  storeObj.userReducer.loginDetails.email;
            setImageURL(`/${storeObj.userReducer.loginDetails.profilePic}`);

        },[])

        let sendUpdateDataTOServerFD = async()=>{
            let dataToSend = new FormData();
          dataToSend.append("firstName",firstNameInputRef.current.value);
          dataToSend.append("lastName",lastNameInputRef.current.value);
          dataToSend.append("age",ageInputRef.current.value);
          dataToSend.append("email",emailInputRef.current.value);
          dataToSend.append("password",passwordInputRef.current.value);

          for(let i=0;i<profilePicInputRef.current.files.length;i++){
          dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
        }
            let reqOptions={
            method:"PATCH",
           body:dataToSend,
           };
           let JSONdata = await fetch("/editProfile",reqOptions);
           let JSOData = await JSONdata.json();
           alert(JSOData.msg);
           console.log(JSOData);
        }
      return (
       
        <div className='App'>
             <TopNavigation></TopNavigation>
            <form>
                <h1>Edit Profile</h1>
                <div>
                    <label>First Name</label>
                    <input ref={firstNameInputRef}
                    onFocus={()=>{inputOnFocus(firstNameInputRef);}}
                    onBlur={()=>{inputOnBlur(firstNameInputRef)}}></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input ref={lastNameInputRef}
                     onFocus={()=>{inputOnFocus(lastNameInputRef);}}
                     onBlur={()=>{inputOnBlur(lastNameInputRef)}}></input>
                </div>
                <div>
                    <label>Age</label>
                    <input  ref={ageInputRef}
                     onFocus={()=>{inputOnFocus(ageInputRef);}}
                     onBlur={()=>{inputOnBlur(ageInputRef)}}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={emailInputRef}
                     onFocus={()=>{inputOnFocus(emailInputRef);}}
                     onBlur={()=>{inputOnBlur(emailInputRef)}} readOnly></input>
                </div>
                <div>
                    <label>Password</label>
                    <input ref={passwordInputRef} type='password'
                     onFocus={()=>{inputOnFocus(passwordInputRef);}}
                     onBlur={()=>{inputOnBlur(passwordInputRef)}}></input>
                </div>
                <div className='profile'>
                    <label >Profile Pic</label>
                    <input type='file' ref={profilePicInputRef}
                     onFocus={()=>{inputOnFocus(profilePicInputRef);}}
                     onBlur={()=>{inputOnBlur(profilePicInputRef)}} 
                     onChange={()=>{
                        let selectedFilePath = URL.createObjectURL(profilePicInputRef.current.files[0])
                        setImageURL(selectedFilePath);
                        console.log(selectedFilePath);
                     }}></input>
                </div>
                <br></br>
                <img src={imageURL}></img>
                <div>
                     <button type='button' onClick={()=>{
                         sendUpdateDataTOServerFD();
                    }}>Update</button>
                </div>
            </form>
            <br></br>
            <Link className='Link' to="/">Login</Link>
        </div>
      );
    };


export default EditProfile