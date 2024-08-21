import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddLanguage = (props) => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { usedLanguages } = props;
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getLanguages();
    }, []);

    const getLanguages = async () => {
        const response = await axios.get(`http://localhost:5005/api/languages`);
        const data = await response.data;
        setLanguages(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        if(data.language === '-1') {
            console.error('Choose language');
            return;
        } else {
            data.productID = id
            const resposnse = await axios.post(`http://localhost:5005/api/translations`, data)
            const answer = await resposnse.data
            if(answer.status === 'success'){
                navigate(0)
            } else {
                console.error(answer);
                
            }
        }
    };

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <select name="language" required >
                    <option value="-1">Select language</option>
                    {
                        languages.flatMap(
                            language => {
                                if(!usedLanguages.includes(language.name)) {
                                    return <option key={ language.id } value={ language.id }>{ language.name }</option>;
                                } else {
                                    return [];
                                }
                            }
                        )
                    }
                </select>
                <textarea className='form-textarea' type="text" name="translation" placeholder='Translation' required />
                <button type="submit">Save</button>
            </form>
        </>
    );
};

export default AddLanguage;