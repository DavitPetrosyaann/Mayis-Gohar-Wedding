import React, { createContext, useContext, useState } from 'react';
import { GalleryPhoto } from '../types';
import { CAROUSEL_PHOTOS as DEFAULT_CAROUSEL, MASONRY_PHOTOS as DEFAULT_MASONRY } from '../data/weddingData';

interface PhotoContextType {
  carouselPhotos: GalleryPhoto[];
  masonryPhotos: GalleryPhoto[];
  addCustomPhotos: (files: FileList | File[]) => Promise<void>;
  resetToDefault: () => void;
  isCustomLoaded: boolean;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carouselPhotos, setCarouselPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('mayis_gohar_custom_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_CAROUSEL;
  });

  const [masonryPhotos, setMasonryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('mayis_gohar_custom_photos_masonry');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_MASONRY;
  });

  const [isCustomLoaded, setIsCustomLoaded] = useState(() => {
    try {
      return !!localStorage.getItem('mayis_gohar_custom_photos');
    } catch {
      return false;
    }
  });

  const addCustomPhotos = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const readAsDataUrl = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      const urls = await Promise.all(fileArray.map(readAsDataUrl));
      const newItems: GalleryPhoto[] = urls.map((url, idx) => ({
        id: `user-photo-${Date.now()}-${idx}`,
        url,
        alt: `Mayis & Gohar Wedding Photo ${idx + 1}`,
        span: idx % 3 === 0 ? 'row-span-2' : 'row-span-1',
      }));

      const combinedCarousel = [...newItems, ...DEFAULT_CAROUSEL].slice(0, 10);
      const combinedMasonry = [...newItems, ...DEFAULT_MASONRY].slice(0, 12);

      setCarouselPhotos(combinedCarousel);
      setMasonryPhotos(combinedMasonry);
      setIsCustomLoaded(true);

      try {
        localStorage.setItem('mayis_gohar_custom_photos', JSON.stringify(combinedCarousel));
        localStorage.setItem('mayis_gohar_custom_photos_masonry', JSON.stringify(combinedMasonry));
      } catch {
        // quota exceeded fallback: keep in memory
      }
    } catch {
      // ignore read errors
    }
  };

  const resetToDefault = () => {
    setCarouselPhotos(DEFAULT_CAROUSEL);
    setMasonryPhotos(DEFAULT_MASONRY);
    setIsCustomLoaded(false);
    try {
      localStorage.removeItem('mayis_gohar_custom_photos');
      localStorage.removeItem('mayis_gohar_custom_photos_masonry');
    } catch {
      // ignore
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        carouselPhotos,
        masonryPhotos,
        addCustomPhotos,
        resetToDefault,
        isCustomLoaded,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
