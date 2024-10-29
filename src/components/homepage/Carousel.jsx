import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getSlider } from "../../services/CarouselService";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const [sliders, setSliders] = useState([]);
  const carouselRef = React.useRef(null); // Create a reference for the carousel

  // Function to fetch slider data from API
  const fetchData = () => {
    getSlider()
      .then(response => {
        if (Array.isArray(response.data)) {
          setSliders(response.data);
        } else {
          console.warn("Fetched data is not an array:", response.data);
          setSliders([]); // Hoặc có thể để null tùy ý
        }
      })
      .catch(error => {
        console.error("Error fetching sliders data:", error);
        setSliders([]); // Hoặc có thể để null tùy ý
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
            <Link to={slider.backLink}>
              <img 
                src={slider.imageUrl} 
                className="w-full h-auto object-contain"
                alt={`Slide ${slider.id}`} 
              />
            </Link>
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
