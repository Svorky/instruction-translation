import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    const { id, title, picture } = props;
    return (
        <Link
            className='card'
            to={ `/product/${id}` }
        >
            <figure>
                <img src={ picture } alt={ title } />
            </figure>
            <h3>{ title }</h3>
        </Link>
    );
};

export default ProductCard;