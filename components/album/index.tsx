"use client";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "../ui/parallax-scroll";

export function Album() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const imageUrls = data.data.map((item: { media_url: any; }) => item.media_url);
      setImages(imageUrls);
    };

    fetchData();
  }, []);
  return <ParallaxScroll images={images} />;
}


