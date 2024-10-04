import React from 'react'
import { PageWithNavbar } from '../../common/components';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../common/apis/users';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (email === '' || password === '') {
      message.error('Please fill all the fields');
      return;
    }
    dispatch(setLoading(true))
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        dispatch(setLoading(false))
        return navigate('/');
      }
      else {
        dispatch(setLoading(false))
        message.error(data.message || 'Some error occured');
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error);
      message.error(error.response.data.message || 'Some error occured');
    }
    dispatch(setLoading(false))
  }

  return (
    <PageWithNavbar>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Login</h1>
        <form className='flex flex-col items-center justify-center mt-8' onSubmit={submitHandler}>
          <input type='text' placeholder='Email or Username*' className='border-b-2 border-black w-80 p-2 my-4' />
          <input type='password' placeholder='Password *' className='border-b-2 border-black w-80 p-2 my-4' />
          <button className='bg-black text-white rounded-3xl px-4 py-2 mt-4' type='submit'>Login</button>
        </form>
      </div>

    </PageWithNavbar>
  )
}

export default Login
