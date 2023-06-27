import React, {useState, useRef} from "react";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 175px;
  height: 175px;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
`;


const Input = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

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
        <Container>
            <ImageContainer onClick={handleImageClick}>
                {selectedImage || imagePath ? (
                    <Image
                        src={selectedImage || imagePath}
                        alt="Selected Image"
                    />
                ) : (
                    <Image
                        src="http://localhost:3000/Images/NoImage.jpeg"
                        alt="Default Image"
                    />
                )}
            </ImageContainer>
            <Input
                type="file"
                accept="image/*"
                id="file-input"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </Container>
    );
};

export default ProfilePhotouploader;
