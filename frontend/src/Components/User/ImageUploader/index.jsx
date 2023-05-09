import React, {useState} from "react";
import styled from "styled-components";

import {Card, Button} from "antd";

const {Meta} = Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
`;
const UploadButton = styled.button`
  background-color: #F5F6F8;
  border-radius: 5%;
  border: none;
  color: #050303;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ECEDF0;
  }
`;

const Input = styled.input`
  margin-bottom: 1rem;
  display: none;

  & + label {
    background-color: #F5F6F8;
    border-radius: 5%;
    border: none;
    color: #050303;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out;
    margin-bottom: 1rem;

    &:hover {
      background-color: #ECEDF0;
    }
  }
`;
const DeleteButton = styled.button`
  background-color: ${props => props.hovered ? '#1E64D1' : '#ccc'};
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1E64D1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const ImageUploader = ({onImageChange}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImage(fileUrl);
            setImageName(file.name);
            onImageChange(file);

        }
    };

    if (typeof URL.createObjectURL === 'undefined') {
        console.log('createObjectURL is not supported');
    }

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImageName('');
    };

    return (
        <Container>
            <ImageContainer>
                {selectedImage ? (
                    <Image src={selectedImage} alt="Selected Image"/>
                ) : (
                    <Image src="http://localhost:3000/Images/NoImage.jpeg" alt="Default Image"/>
                )}
            </ImageContainer>
            <Input type="file" accept="image/*" id="file-input" onChange={handleImageChange}/>
            <label htmlFor="file-input">Choose Icon</label>

        </Container>
    );
};

export default ImageUploader;
