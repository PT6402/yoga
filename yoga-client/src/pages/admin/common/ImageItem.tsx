import { useEffect, useState } from "react";

export default function ImageItem({ srcImage }: { srcImage?: string }) {
  const limitReloadImage = 100;
  const [countReload, setCountReload] = useState(0);
  const [error, setError] = useState(false);
  const [imageItem, setImageItem] = useState({ image: srcImage });
  const imageUrl = `${import.meta.env.VITE_SERVER_URL}/images/${
    imageItem.image
  }`;
  useEffect(() => {
    if (countReload != limitReloadImage) {
      if (error) {
        setError(false);
        setImageItem({ image: srcImage });
        setCountReload((prev) => prev + 1);
      }
    }
  }, [error]);
  return (
    <>
      {!error && imageItem && (
        <img
          src={imageUrl}
          className="w-[100px] h-[100px] inline-block shrink-0 rounded-2xl object-cover"
          onError={() => setError(true)}
          alt="product image"
        />
      )}
    </>
  );
}
