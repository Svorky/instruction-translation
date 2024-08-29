import axios from 'axios';
import { useRef } from 'react';

const Search = (props) => {
  const { setProducts } = props  
  const inputRef = useRef()
    
    const handleChange = async () => {
        const input = inputRef.current
        
        if(!input) return
        if(input.value === '') return 

        const response = await axios.get(`/search/${input.value}`)
        const data = await response.data
        console.log(data)
        setProducts(data)
    }

  return (
    <>
        <input ref={inputRef} className='search' type='text' placeholder='Search...' onChange={handleChange}/>
    </>
  )
}

export default Search