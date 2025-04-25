import ImageGrid from "./ImageGrid";

export default function ArtistesPage() {
  const images = [
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 1" },
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 2" },
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 3" },
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 4" },
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 5" },
    { artisteUrl: "/api/placeholder/400/320", artisteName: "Image 6" },
    // Add more images as needed
  ];

  return (
    <div className="flex border-2 py-8 mb-8 mx-auto">
      <ImageGrid images={images} />
    </div>
  );
}
