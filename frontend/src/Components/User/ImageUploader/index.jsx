import React, {useState} from "react";
import * as ImageUploaderComponents from "./Style";


const ImageUploader = ({imagePath, onImageChange}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImage(fileUrl);
            onImageChange(file);

        }
    };

    if (typeof URL.createObjectURL === 'undefined') {
        console.log('createObjectURL is not supported');
    }

    return (
        <ImageUploaderComponents.Container>
            <ImageUploaderComponents.ImageContainer>
                {selectedImage || imagePath ? (
                    <ImageUploaderComponents.Image src={selectedImage || imagePath} alt="Selected Image"/>
                ) : (
                    <ImageUploaderComponents.Image src="http://localhost:3000/Images/NoImage.jpeg" alt="Default Image"/>
                )}
            </ImageUploaderComponents.ImageContainer>
            <ImageUploaderComponents.Input type="file" accept="image/*" id="file-input" onChange={handleImageChange}/>
            <label htmlFor="file-input">Choose Icon</label>
        </ImageUploaderComponents.Container>
    );
};

export default ImageUploader;
