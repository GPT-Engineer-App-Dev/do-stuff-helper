import React, { useState } from "react";
import { Container, VStack, Input, Button, Image, HStack, Text } from "@chakra-ui/react";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!selectedImage || !width || !height) return;

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL());
    };
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <Image src={selectedImage} alt="Selected" boxSize="200px" objectFit="cover" />}
        <HStack spacing={2}>
          <Input placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
          <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </HStack>
        <Button onClick={handleResize}>Resize Image</Button>
        {resizedImage && <Image src={resizedImage} alt="Resized" boxSize="200px" objectFit="cover" />}
      </VStack>
    </Container>
  );
};

export default Index;