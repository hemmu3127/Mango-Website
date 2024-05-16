import React, { useState } from 'react' 
import '../Pages/CSS/LoginSignup.css'
const LoginSignup = () => {
    


    const [state,setState] = useState("Login");
    const[formData,setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

  

    const login = async () =>{
        console.log("Login Function is executed",formData);
        
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        } 
    }

    const signup = async () =>{
        console.log('signup is executed',formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        } 
    }

    const changeHandler =  (e) =>{
        const { name, value } = e.target;

        if (name === 'username') {
          const sanitizedValue = value.replace(/\d/g, ''); 
          setFormData({ ...formData, [name]: sanitizedValue });
        } else {
          setFormData({ ...formData, [name]: value });
        }

    }

    return (

        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==='Sign Up'?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Enter Name'  />:<></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name ='password'value={formData.password} onChange={changeHandler} type="password" placeholder='Your Password' />
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==='Sign Up'?
                <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}> Login Here </span></p>
            :<p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}> Click Here </span></p>}
                
                

                <div className="loginsingup-agree">
                    <input type='checkbox' name='' id=''/>
                    <p>By Cotinuing, I agree to the terms and Policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;