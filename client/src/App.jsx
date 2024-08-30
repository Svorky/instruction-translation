import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Add from './components/Add.jsx';
import Product from './components/Product.jsx';
import LoginRegister from './components/LoginRegister.jsx';
import { Auth } from './auth/Auth.jsx';
import { UserContext } from './context/UserContext.jsx';
import { useEffect, useState } from 'react';
import User from './components/User.jsx';

function App() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    if(Object.keys(user).length === 0){
      const token = localStorage.getItem('token')
      const userLocal = localStorage.getItem('user')
      if(token){
        setUser({...user, token, user: userLocal})
      }
    }
  },[])

  return (
    <>
      <UserContext.Provider value={ { user, setUser } }>
        <Header />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/add' element={ <Add /> } />
          <Route path='product/:id' element={ <Product /> } />
          <Route path='/login' element={ <LoginRegister title={ 'Login' } /> } />
          <Route path='/register' element={ <LoginRegister title={ 'Registration' } /> } />
          <Route path='/user' element={<User />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
