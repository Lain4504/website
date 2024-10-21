import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getSlider } from "../services/CarouselService";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Import Ant Design icons

const CarouselComponent = () => {
  const [sliders, setSliders] = useState([]);
  const carouselRef = React.useRef(null); // Create a reference for the carousel

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

  // Custom function to go to the next slide
  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  // Custom function to go to the previous slide
  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  return (
    <div className="relative">
      <Carousel autoplay dots={{ className: 'custom-dots' }} className="-z-60" ref={carouselRef}>
        {sliders.map((slider) => (
          <div key={slider.id} className="w-full">
            <a href={slider.backLink}>
              <img 
                src={slider.imageUrl} 
                className="w-full h-auto object-contain"
                alt={`Slide ${slider.id}`} 
              />
            </a>
          </div>
        ))}
      </Carousel>
      
      {/* Navigation buttons */}
      <button 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        onClick={prev}
        aria-label="Previous"
      >
        <LeftOutlined className="hover:text-blue-500" />
      </button>
      <button 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        onClick={next}
        aria-label="Next"
      >
        <RightOutlined className="hover:text-blue-500"/>
      </button>
    </div>
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
