import './Header.css'
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav>
                <div className='logo'><Link to={'/'}>Translate Instruction</Link></div>
                <div className='links'>
                    <NavLink to={ '/' } >Home</NavLink>
                    <NavLink to={ '/add' }>Add</NavLink>
                </div>
            </nav>
        </>
    );
};

export default Header;