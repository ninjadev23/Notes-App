import React, { useState } from 'react';
import { useFetch, ApiUrl, transformZodError } from '../utils';
import type { errorResponse, suceessResponse, ZodError } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading, refetch } = useFetch({
    url: `${ApiUrl}/login`,
    method: 'POST',
    autoFetch: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response: suceessResponse | errorResponse = await refetch({ email, password }) as suceessResponse | errorResponse;
    if(response && 'message' in response) {
      navigate("/")
    }
};
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={handleLogin} className='p-3 flex flex-col justify-center shadow-2xl shadow-black'>
        <h1 className='text-2xl text-center m-3'>Login</h1> 
          <input
            className='outline-0 p-2 m-3 border-b-1 border-b-white/30'
            type="email"
            value={email}
            placeholder='example@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className='outline-0 p-2 m-4  border-b-1 border-b-white/30'
            type="password"
            value={password}
            placeholder='Your password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button type="submit" disabled={loading} className='bg-cyan-700 p-1.5 rounded-md hover:cursor-pointer'>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p className='p-3'>Don't have an account? <Link className="text-cyan-700" to="/signup">Sign up</Link></p>
        {error && Array.isArray(error) && transformZodError((error as ZodError[])).map((err, index)=>(
          <p key={index} className='text-center p-3 bg-gray-950/30 m-3'>
            {err}
          </p>
        )) }
        {error && !Array.isArray(error) && 
          <p className='text-center p-3 bg-gray-950/30 m-3'>{(error as string)}</p>
        }
      </form>
    </div>
  );
};

export default Login;