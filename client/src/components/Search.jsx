import axios from 'axios';
import { useEffect, useState } from 'react';

const Search = (props) => {
  const { setProducts } = props;
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => fetchSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const fetchSearch = async (query) => {

    if(query === '') {
      return;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/search/${query}`);
    const data = await response.data;
    console.log(data);
    setProducts(data);
  };

  return (
    <>
      <input className='search' type='text' placeholder='Search...' onChange={ event => setQuery(event.target.value) } />
    </>
  );
};

export default Search;