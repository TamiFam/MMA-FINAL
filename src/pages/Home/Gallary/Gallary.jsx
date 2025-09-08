import React from 'react';
import image1 from '../../../assets/gallary/mma-gallery-11.jpeg';
import image2 from '../../../assets/gallary/mma-gallery-22.jpg';
import image3 from '../../../assets/gallary/mma-gallery-33.jpg';
import image4 from '../../../assets/gallary/mma-gallery-44.jpg';
import image5 from '../../../assets/gallary/mma-global-55.jpg';

function Gallery() {
  return (
    <div className="w-full px-4 py-16 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-12">
        Our <span className="text-secondary">Gallery</span>
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {[image1, image2, image3, image4, image5].map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-md group relative aspect-square">
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Optional overlay effect */}
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-25 transition-all rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
