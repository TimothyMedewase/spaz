import ImageGrid from "../../components/artistes/ImageGrid";

export default function ArtistesData() {
  const images = [
    { src: "/api/placeholder/400/320", alt: "Image 1" },
    { src: "/api/placeholder/400/320", alt: "Image 2" },
    { src: "/api/placeholder/400/320", alt: "Image 3" },
    { src: "/api/placeholder/400/320", alt: "Image 4" },
    { src: "/api/placeholder/400/320", alt: "Image 5" },
    { src: "/api/placeholder/400/320", alt: "Image 6" },
    // Add more images as needed
  ];

  return (
    <div className="flex border-2 py-8 mb-8 mx-auto">
      <ImageGrid images={images} />
    </div>
  );
}
