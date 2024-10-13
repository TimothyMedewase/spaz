import React from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="container mx-auto px-2">
      <div className="gap-x-10 gap-y-8 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {images.map((image, index) => (
          <div key={index} className="  border-2 aspect-w-16 aspect-h-9">
            <img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
