import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getSlider } from "../services/CarouselService";

const CarouselComponent = () => {
  const [sliders, setSliders] = useState([]);

  // Function to fetch slider data from API
  const fetchData = () => {
    getSlider()
      .then(response => {
        setSliders(response.data);  // Set the fetched data to state
      })
      .catch(error => {
        console.error("Error fetching sliders data:", error);
      });
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Carousel autoplay>
      {sliders.map((slider) => (
        <div key={slider.id} className="w-full">
          <a href={slider.backLink}>
            <img 
              src={slider.imageUrl} 
              className="w-full h-auto object-contain" // Tailwind classes for image scaling
              alt={`Slide ${slider.id}`} 
            />
          </a>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
