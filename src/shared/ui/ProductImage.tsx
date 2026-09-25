"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProductImageProps = Omit<ImageProps, "onLoad" | "onLoadingComplete">;

export function ProductImage({ className = "", alt, ...props }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? (
        <div
          className="absolute inset-0 z-0 animate-pulse bg-stone-200"
          aria-hidden="true"
        />
      ) : null}
      <Image
        {...props}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`relative z-10 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`.trim()}
      />
    </>
  );
}
