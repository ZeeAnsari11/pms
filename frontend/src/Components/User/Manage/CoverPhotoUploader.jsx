import React, { useState } from 'react';
import * as CoverPhotoComponents from './CoverPhotoStyle'

const CoverPicture = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(URL.createObjectURL(file));
  };

  return (
    <CoverPhotoComponents.CoverPictureWrapper backgroundImage={backgroundImage}>
      <div className="uploader">
        <input type="file" onChange={handleImageUpload} />
      </div>
    </CoverPhotoComponents.CoverPictureWrapper>
  );
};

export default CoverPicture;
