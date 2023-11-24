import React, {useState, useRef} from "react";
import * as ProfilePhotoUploaderComponents from './ProfilePhotoUploaderStyle';
import {REACT_APP_DOMAIN} from "../../../Utils/envConstants";

const ProfilePhotouploader = ({imagePath, onImageChange}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImage(fileUrl);
            setImageName(file.name);
            onImageChange(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <ProfilePhotoUploaderComponents.Container>
            <ProfilePhotoUploaderComponents.ImageContainer onClick={handleImageClick}>
                {selectedImage || imagePath ? (
                    <ProfilePhotoUploaderComponents.Image
                        src={selectedImage || imagePath}
                        alt="Selected Image"
                    />
                ) : (
                    <ProfilePhotoUploaderComponents.Image
                        src={`${REACT_APP_DOMAIN}/Images/NoImage.jpeg`}
                        alt="Default Image"
                    />
                )}
            </ProfilePhotoUploaderComponents.ImageContainer>
            <ProfilePhotoUploaderComponents.Input
                type="file"
                accept="image/*"
                id="file-input"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </ProfilePhotoUploaderComponents.Container>
    );
};

export default ProfilePhotouploader;
