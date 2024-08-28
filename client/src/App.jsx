import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Add from './components/Add.jsx';
import Product from './components/Product.jsx';
import LoginRegister from './components/LoginRegister.jsx';
import { Auth } from './auth/Auth.jsx';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/add' element={ <Add /> } />
        <Route path='product/:id' element={<Product />} />
        <Route path='/login' element={<LoginRegister title={'Login'} /> } />
        <Route path='/register' element={ <LoginRegister title={'Registration'} /> } />
      </Routes>
    </>
  );
}

export default App;
