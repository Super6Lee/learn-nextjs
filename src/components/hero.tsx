import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImgUrlProps {
  imgUrl: StaticImageData;
  altText: string;
  content: string;
}

export default function Hero(props: ImgUrlProps) {
  return (
    <div className="text-white h-screen relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.imgUrl}
          alt={props.altText}
          fill
          className="object-cover"
        ></Image>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900"></div>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl justify-center">{props.content}</h1>
      </div>
    </div>
  );
}
