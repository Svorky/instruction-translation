import { useEffect, useState } from 'react';
import './ImagePreview.css'
import PropTypes from 'prop-types';

const ImagePreview = (props) => {
    const { onChange } = props
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if(!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if(!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);

        if(onChange) onChange(e)
    };

    return (
        <>
            <input type="file" id="picture" name="picture" accept="image/png, image/jpeg, image/webp" required onChange={ onSelectFile } />
            { selectedFile && <img src={ preview } className='preview-image' /> }
        </>
    );
};

export default ImagePreview;

ImagePreview.propTypes = {
    onChange: PropTypes.func
}