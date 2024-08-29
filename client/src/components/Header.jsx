import { useContext } from 'react';
import './Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    const navigate = useNavigate()

    const handleExit = () => {
        localStorage.clear()
        setUser({})
        navigate('/')
    }

    return (
        <>
            <nav>
                <div className='logo'><Link to={ '/' }>Translate Instruction</Link></div>
                <div className='links'>
                    <NavLink to={ '/' } >Home</NavLink>
                    <NavLink to={ '/add' }>Add</NavLink>
                    { !user?.user && <>
                        <NavLink to={ '/login' }>Login</NavLink>
                        <NavLink to={ '/register' }>Register</NavLink>
                    </> }
                    {
                        user.user && 
                        <>
                            <span>{ user.user }</span>
                            <Link onClick={handleExit}>Exit</Link>
                        </>
                    }
                </div>
            </nav>
        </>
    );
};

export default Header;