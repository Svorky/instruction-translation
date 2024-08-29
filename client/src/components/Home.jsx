import './Home.css'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';
import Search from './Search.jsx';

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    getLastProducts()
  },[])

  const getLastProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/products/last`)
    const data = response.data
    setProducts(data)
  }

  return (<>
    <h1>Home</h1>
    <Search setProducts={setProducts} />
    <h2>Last translations</h2>
    <section className='last-cards'>
      {
        products.map(
          product => <ProductCard key={product.id} {...product}/>
        )
      }
    </section>
    </>)
}

export default Home