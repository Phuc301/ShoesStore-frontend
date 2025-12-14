import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { ProductGalleryProps } from '@/interfaces/admin/ProductManagement/product.interface';

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedColor,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filter images by selected color or show all if no color selected
  const filteredImages = selectedColor
    ? images.filter((img) => img.color === selectedColor || !img.color)
    : images;

  const currentImage = filteredImages[currentImageIndex] || filteredImages[0];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
        <img
          src={currentImage?.url}
          alt={currentImage?.alt}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {filteredImages.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => selectImage(index)}
            className={`relative bg-gray-100 rounded-lg overflow-hidden aspect-square border-2 transition-colors ${
              index === currentImageIndex
                ? 'border-orange-500'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
