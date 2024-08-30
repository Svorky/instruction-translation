import { useContext, useEffect, useState } from 'react';
import './User.css';
import { UserContext } from '../context/UserContext.jsx';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

const User = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchUserProducts()
    },[])

    const fetchUserProducts = async () => {
        const responseProductIDs = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/userproducts`,
            {user: user.user}
        )
        const productIDs = await responseProductIDs.data
        
        setProducts(productIDs)
    }

    return (
        <main>
            <h1>{ user.user }</h1>
            {
                products && products.map(
                    product => <ProductCard key={product.id} {...product} />
                )
            }
        </main>
    );
};

export default User;