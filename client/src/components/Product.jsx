import './Product.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Translation from './Translation.jsx';
import AddLanguage from './AddLanguage.jsx';
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "@vanyapr/react-image-magnifiers";
import ImagePreview from './ImagePreview.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addLanguage, setAddLanguage] = useState(false);
  const [editPicture, setEditPicture] = useState(false)
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
  const [pictureData, setPictureData] = useState();
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    getProduct(id);
  }, []);

  const getProduct = async (id) => {
    const response = await axios.get(`/api/products/id/${id}`);
    const data = await response.data;
    setProduct(data);
  };

  const loadNewPicture = async (picture) => {
    const response = await axios.post(`/api/picture/add`,
      {
        product_id: id,
        picture
      }
    );
    const answer = await response.data;
    if(answer.status === 'success'){
      navigate(0)
    }
  }

  const handleAddLanguage = () => {
    if(user.token){
      setAddLanguage(prev => !prev);
    } else {
      navigate('/login')
    }
  };

  const handleEditPicture = () => {
    if(user.token){
      setEditPicture(prev => !prev)
    } else {
      navigate('/login')
    }
  }

  const handleChangePicture = () => {
    console.log(event.target.files)
    const reader = new FileReader();
    if(event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onloadend = () => {
      setPictureData(reader.result)
      setSaveButtonDisabled(false)
    }

  }

  const handleNewPicture = () => {
    loadNewPicture(pictureData)
  }

  if(!product) return <></>;

  return (
      <main className='product'>
          <h2>{product.title}</h2>
          <div>Added {new Date(Date.parse(product.date)).toLocaleString()}</div>
          <figure className='flex'>
              <Magnifier
                  className='input-position'
                  imageSrc={product.picture}
                  imageAlt={product.title}
                  // largeImageSrc={product.picture} // Optional
                  mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
                  touchActivation={TOUCH_ACTIVATION.TAP} // Optional
                  dragToMove={true}
              />
              <figcaption
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={handleEditPicture}
              >
                  {editPicture ? 'Cancel' : 'Edit picture'}
              </figcaption>
              {editPicture && (
                  <>
                      <ImagePreview onChange={handleChangePicture} />
                      <button disabled={saveButtonDisabled} onClick={handleNewPicture}>Save</button>
                  </>
              )}
          </figure>

          <section className='translations'>
              {product &&
                  product.translations
                      .sort((a, b) => b.original - a.original)
                      .map((translation) => {
                          return (
                              <Translation
                                  key={translation.id}
                                  {...translation}
                              />
                          );
                      })}
          </section>
          <button onClick={handleAddLanguage} className='addlanguagebtn'>
              {addLanguage ? "Close" : "Add Language"}
          </button>
          {addLanguage && (
              <AddLanguage
                  usedLanguages={product.translations.map((t) => t.language)}
              />
          )}
      </main>
  );
};

export default Product;