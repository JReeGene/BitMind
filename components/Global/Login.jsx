import React, { useState, useEffect } from 'react'
import Footer from '../Global/Footer';

const Login = ({ setActiveComponent, axios, notifyError, notifySuccess }) => {
  const [user, setUser] = useState({
    password: '',
  });

  const handleFormFieldChange = (fieldName, e)=>{
    setUser({...user, [fieldName]: e.target.value})
  };
  
  const apiLogin = async(e)=>{
    e.preventDefault()
    if(user.email == '' ||user.password == '' )
      {
        return notifyError('Please enter the correct email and password');
      }
      notifySuccess('Login to your account in a few...');
      try{
        //API call
        const response = await axios({
          method: 'POST',
          url: `/api/v1/user/login`,
          withCredentials: true,
          data:{
            email: user.email,
            password: user.password,
          }
        })

        if(response.data.status === 'success'){
          notifySuccess('Successful login')
          localStorage.setItem(
            'USER_MEMBERSHIP',
            response.data.data.user.membershipType
          );
          localStorage.setItem(
            'CryptoBot_BackEnd',
            response.data.data.user._id
          );
          localStorage.setItem(
            'CryptoAUT_TOKEN',
            response.data.token
          );
          window.location.reload();
        }else if(response.data.status == 'fail'){
          notifyError(response.data.message)
        }
      }catch(error){
        console.log(error)
      }
  };
  return (
    <div className='bitmind_fn_sign'>
    <div className='sign__content'>
      <h1 className ='fn__animated_text'
          style={{
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                  fontSize: '20px'}}>BITMIND
      </h1>
      <form className='login'>
        <div className='form__content'>
          <div className='form__title'>Sign In</div>
          <div className='form__username'>
            <label htmlFor="user__login">Email</label>
            <input type="text" className='input' onChange={(e)=>
            handleFormFieldChange("email", e)} />
          </div>
          <div className='form__username'>
            <label htmlFor="user__login">Password</label>
            <input type="text" className='input' onChange={(e)=>
            handleFormFieldChange("password", e)} />
          </div>
          <div className='form__alternative'>
            <a onClick={(e)=>apiLogin(e)}
            className='bitmind_fn_button'            
            >
              <span>Log In</span>
            </a>
          </div>
        </div>         
      </form>
      <div className='sign__desc'>
        <p>Not a User?
          <a onClick={()=>setActiveComponent('Signup')}> Sign Up</a>
          {/* CHECK ABOVE */}
        </p>
        <br />
        <Footer/>
      </div>
    </div>
  </div>
  )
}

export default Login