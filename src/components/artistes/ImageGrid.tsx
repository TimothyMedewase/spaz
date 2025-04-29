import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageItem {
  artisteImgUrl?: string;
  artisteName?: string;
  artisteUrl: string;
}

interface ImageGridProps {
  images: ImageItem[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="container mx-auto px-2">
      <div className="gap-x-10 gap-y-16 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <Link
              href={image.artisteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={image.artisteImgUrl || "/placeholder-artist.jpg"}
                  alt={image.artisteName || `Artist ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-artist.jpg";
                  }}
                />
              </div>
              <div className="mt-3">
                <h2 className="text-center text-lg font-semibold hover:underline">
                  {index + 1}. {image.artisteName || `Artist ${index + 1}`}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
