import React, { useState, useEffect } from 'react';
import Footer from '../Global/Footer';

const Signup = ({ axios, setActiveComponent, notifyError, notifySuccess }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleFormFieldChange = (fieldName, e)=>{
    setUser({...user, [fieldName]: e.target.value})
  };
  
  const createAcccount = async(e)=>{
    e.preventDefault()
    if(user.name =='' || 
      user.email == '' ||
      user.password == '' ||
      user.passwordConfirm=='')
      {
        return notifyError('Please provide all the details');
      }
      notifySuccess('Setting you up in a few...');
      try{
        //API call
        const response = await axios(
          {
            method: 'POST',
            url: `/api/v1/user/signup`,
            withCredentials: true,
            data:
              {
                name: user.name,
                email: user.email,
                password: user.password,
                passwordConfirm: user.passwordConfirm,
              },
          }
        );

        if(response.data.status == 'success'){
          notifySuccess('Account created successfully')
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
        }else{
          notifyError('Something went wrong, try again later...')
        }
      }catch(error){
        console.log(error)
      }
  };
  console.log(user)

  return (
  <div className='bitmind_fn_sign'>
    <div className='sign__content'>
      <br/>
      <br/>
      <h1 style={
                  {
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    fontSize: '20px'                  
                  }
                }>
                  BITMIND
      </h1>
      <form className='login'>
        <div className='form__content'>
          <div className='form__title'>Sign Up</div>
          
          <div className='form__username'>
            <label htmlFor='user__login'>Name</label>
            <input type='text' className='input' onChange={(e)=>
            handleFormFieldChange('name', e)} />
          </div>
          
          <div className='form__username'>
            <label htmlFor='user__login'>Email</label>
            <input type='text' className='input' onChange={(e)=>
            handleFormFieldChange('email', e)} />
          </div>
          
          <div className='form__username'>
            <label htmlFor='user__login'>Password</label>
            <input type='text' className='input' onChange={(e)=>
            handleFormFieldChange('password', e)} />
          </div>
          
          <div className='form__username'>
            <label htmlFor='user__login'>Confirm Password</label>
            <input type='text' className='input' onChange={(e)=>
            handleFormFieldChange('passwordConfirm', e)} />
          </div>
          
          <div className='form__alternative'>
            <a onClick={(e)=>createAcccount(e)}
            className='bitmind_fn_button'            
            >
              <span>Create Account</span>
            </a>
          </div>
        </div>         
      </form>
      <div className='sign__desc'>
        <p>Have an Account?
          <a onClick={()=>setActiveComponent('Login')}> Login</a>
        </p>
        <br />
        <Footer/>
      </div>
    </div>
  </div>
  );
};

export default Signup