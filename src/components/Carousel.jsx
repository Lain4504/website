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
    <Carousel autoplay dots={{ className: 'custom-dots' }} className="-z-10">
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

// CSS styles
const styles = `
.custom-dots li {
  background: black !important; // Set dot color to black
}
.custom-dots li.slick-active {
  background: gray !important; // Optional: active dot color
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
