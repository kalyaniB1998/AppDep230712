import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider } from 'react-redux';
import thunk from 'redux-thunk';

let initialStore = {
  loginDetails:{}
};
let userReducer = (latestStore=initialStore,disptchesObj)=>{

  if(disptchesObj.type==="login"){
    return{...latestStore,loginDetails:disptchesObj.data};
  }
  return latestStore;
};
  let taskReducer = (latestStore=initialStore,disptchesObj)=>{
    if(disptchesObj.type==="addTask"){
    return{...latestStore};
  }else if(disptchesObj.type==="editTask"){
    return{...latestStore};
  }else if(disptchesObj.type==="removeTask"){
    return{...latestStore};
  }else if(disptchesObj.type==="deleteTask"){
    return{...latestStore};
    }

  return latestStore;

};
let leaveReducer = (latestStore=initialStore,disptchesObj)=>{
  if(disptchesObj.type==="addLeave"){
  return{...latestStore};
}else if(disptchesObj.type==="editLeave"){
  return{...latestStore};
}else if(disptchesObj.type==="removeLeave"){
  return{...latestStore};
}else if(disptchesObj.type==="deleteLeave"){
  return{...latestStore};
  }

return latestStore;

};

// let store = createStore(userReducer);

let store = createStore(combineReducers({userReducer,taskReducer,leaveReducer}),applyMiddleware(thunk)
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
