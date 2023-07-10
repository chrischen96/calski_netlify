import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        console.log({email, password})

       
        await axios.post('http://localhost:3001/api/user/login', { email, password })
            .then(res => {
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: 'LOGIN', payload: res.data });
                setIsLoading(false);
                navigate('/resorts');
            })
            .catch(error => {
                console.log('fail')
                setIsLoading(false);
                setError(error.response.data.message);
            })
    }
      
        return { login, isLoading, error };
}