import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Translation = (props) => {
  const { id: product_id } = useParams();
  const { id: translation_id, language, language_id, translation, original } = props;
  const [disabled, setDisabled] = useState(true);
  const textareaRef = useRef(translation)
  const navigate = useNavigate()

  const handleEdit = () => {
    setDisabled(false);
  };

  const handleCancel = () => {
    textareaRef.current.value = translation
    setDisabled(true)
  }

  const handleSave = async () => {
    const update = {translation_id, product_id, language_id, translation: textareaRef.current.value, original}
    console.log(update)
    const response = await axios.post(`http://localhost:5005/api/translations/update`,
      update
    );
    const data = await response.data;
    // navigate(0)
  }

  return (<>
    <h4>Language { language } { original && <span className='original'>Original</span> }</h4>
    <textarea ref={textareaRef} className='form-textarea' disabled={ disabled } >{translation}</textarea>
    <div>
      {disabled && <button onClick={ handleEdit }>Edit translation</button>}
      { !disabled && <button onClick={handleSave}>Save</button> }
      { !disabled && <button onClick={handleCancel}>Cancel</button> }
    </div>
  </>
  );
};

export default Translation;