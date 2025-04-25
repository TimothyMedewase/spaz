import React from "react";
import Image from "next/image";

interface Image {
  artisteUrl?: string;
  artisteName?: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="container mx-auto px-2">
      <div className="gap-x-10 gap-y-16 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {images.map((image, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9">
            <Image
              src={image.artisteUrl || "/placeholder.jpg"} // Default placeholder image if artisteUrl is not provided
              alt={image.artisteName || `Image ${index + 1}`}
              width={400}
              height={320}
              className="object-cover w-full h-full rounded-lg "
            />
            <div>
              <h2 className="text-center text-lg font-semibold my-2 ">
                {image.artisteName || `Image ${index + 1}`}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
