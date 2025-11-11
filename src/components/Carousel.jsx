import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";

const images = [image1, image2, image3, image4, image5, image6];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box className="flex flex-row items-center justify-center relative mt-3"
      sx={{width: '30vw'}}
    >
      <img
        src={images[currentIndex]}
        alt={`Carousel image ${currentIndex + 1}`}
        className="w-full h-48 rounded-xl mb-3 object-fit"
      />
    </Box>
  );
};

export default Carousel;
