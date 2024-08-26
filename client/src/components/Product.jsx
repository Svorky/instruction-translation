import './Product.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Translation from './Translation.jsx';
import AddLanguage from './AddLanguage.jsx';
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "@vanyapr/react-image-magnifiers";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addLanguage, setAddLanguage] = useState(false);
  const [editPicture, setEditPicture] = useState(false)
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
  const [pictureData, setPictureData] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    getProduct(id);
  }, []);

  const getProduct = async (id) => {
    const response = await axios.get(`http://localhost:5005/api/products/id/${id}`);
    const data = await response.data;
    setProduct(data);
  };

  const loadNewPicture = async (picture) => {
    const response = await axios.post(`http://localhost:5005/api/picture/add`,
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
    setAddLanguage(prev => !prev);
  };

  const handleEditPicture = () => {
    setEditPicture(prev => !prev)
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
      <>
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
                      <input
                          type='file'
                          id='picture'
                          name='picture'
                          accept='image/png, image/jpeg'
                          required
                          onChange={handleChangePicture}
                      />
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
          <button onClick={handleAddLanguage}>
              {addLanguage ? "Close" : "Add Language"}
          </button>
          {addLanguage && (
              <AddLanguage
                  usedLanguages={product.translations.map((t) => t.language)}
              />
          )}
      </>
  );
};

export default Product;