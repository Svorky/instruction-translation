import { useEffect, useState } from 'react'
import LoginRegister from '../components/LoginRegister.jsx';
import axios from 'axios';


export const Auth = ({children}) => {
  const [redirect, setRedirect] = useState(false)
  useEffect(()=>{
    verify()
  },[])
  const verify = async() => {
    try {
        const response = await axios.get('http://localhost:5000/user/auth',
            {
                headers:{
                    'x-access-token': 'token'
                },
                withCredentials: true})
        if(response.status === 201){
            setRedirect(true)
        }
    } catch (error) {
        console.error();
        setRedirect(false)
    }
  }
    return redirect ? children : <LoginRegister title='Login' />
}