import './Product.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Translation from './Translation.jsx';
import AddLanguage from './AddLanguage.jsx';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null)
  const [addLanguage, setAddLanguage] = useState(false)

  useEffect(()=>{
    getProduct(id)
  },[])

  const getProduct = async (id) => {
    const response = await axios.get(`http://localhost:5005/api/products/id/${id}`)
    const data = await response.data
    setProduct(data)
  }

  const handleAddLanguage = () => {
    setAddLanguage(prev => !prev)
  }

  if(!product) return <></>

  return (<>
    <h2>{product.title}</h2>
    <div>Added {new Date(Date.parse(product.date)).toLocaleString()}</div>
    <figure>
      <img src={`${product.picture}`} alt={product.title} />
      <figcaption>Edit picture</figcaption>
    </figure>
    <section>
      {
        product && product.translations
        .sort((a,b) => b.original - a.original)
        .map(
          translation => {
            return <Translation key={translation.id} {...translation} />
          }
        )
      }
    </section>
    <button onClick={handleAddLanguage}>{addLanguage ? 'Close' : 'Add Language'}</button>
    {
      addLanguage && <AddLanguage usedLanguages={product.translations.map( t => t.language)}/>
    }
  </>);
};

export default Product;