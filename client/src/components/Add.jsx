import { useContext, useEffect, useState } from 'react';
import './Add.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import ImagePreview from './ImagePreview.jsx';

const Add = () => {
    const [languages, setLanguages] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if(!user?.token) navigate('/login');

    useEffect(() => {
        getLanguages();
    }, []);


    const getLanguages = async () => {
        const response = await axios.get(`http://localhost:5005/api/languages`);
        const data = await response.data;
        setLanguages(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        // console.log(event.target.picture.files[0])
        const reader = new FileReader();
        reader.onloadend = async () => {
            data.pictureString = reader.result; //.split(',')[1]; // Base64 string
            // console.log('reader.result', reader.result)
            // console.log('data', data)

            const response = await axios.post(`http://localhost:5005/api/products`, data);
            const answer = await response.data;
            console.log(answer);
            if(answer.status === 'success') {
                setMessage('Record saved');
                navigate(`/product/${answer.data[0].id}`);
            } else {
                setMessage('error');
            }
        };

        if(data.picture) {
            reader.readAsDataURL(data.picture);
        }

        console.log(data);

        if(data.language === '-1') {
            console.error('Choose language');
            return;
        }
    };

    return (<>
        <h1>Add</h1>
        <form onSubmit={ handleSubmit } className='addform'>
            <input type="text" name="title" placeholder='Title' required />
            <select name="language" required >
                <option value="-1">Select language</option>
                {
                    languages.map(
                        language => <option key={ language.id } value={ language.id }>{ language.name }</option>
                    )
                }
            </select>
            <textarea className='form-textarea' type="text" name="translation" placeholder='Translation' required />
            <ImagePreview />
            <input type="number" name='barcode' placeholder='barcode' />

            <button type="submit">Create</button>
        </form>
        <div id='message'>{ message }</div>
    </>);
};

export default Add;