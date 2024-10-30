import React, { useEffect, useState } from 'react';
import { getAds } from '../../services/CarouselService';

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentAd, setCurrentAd] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            // Introduce a delay of 2 seconds before fetching ads
            await new Promise((resolve) => setTimeout(resolve, 2000));

            try {
                const response = await getAds();
                setAds(response.data);
                // Randomly select an ad from the fetched ads
                const randomIndex = Math.floor(Math.random() * response.data.length);
                setCurrentAd(response.data[randomIndex]);
                setShowPopup(true); // Show the popup
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 10000); 
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    const closePopup = () => {
        setShowPopup(false);
    };

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ads-container">
            {showPopup && currentAd && (
                <>
                    <div className="overlay" onClick={closePopup} />
                    <div className="ad-popup" style={popupStyle}>
                        <button className="close-button" onClick={closePopup}>✖</button>
                        <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
                            <img src={currentAd.image} alt={currentAd.title} style={imageStyle} />
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

const popupStyle = {
    position: 'fixed',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust for center alignment
    zIndex: '1000',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    opacity: 1, // Start visible
    animation: 'fade-in 1.5s forwards', // Animation for fading in
};

const imageStyle = {
    width: '100%', // Set width to 100% to fill the container
    height: 'auto', // Maintain aspect ratio
    borderRadius: '8px', // Optional: Add rounded corners
};

// CSS animation keyframes for fading in
const styles = `
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    z-index: 999; /* Ensure overlay is below the popup */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001; /* Ensure the close button is above the popup */
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Ads;
