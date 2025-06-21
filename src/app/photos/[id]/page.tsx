import React from "react";
import { photos } from "@/data/data";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const photo = photos.find((item) => item.id === params.id);

  if (!photo) {
    return <div>Photo Not Found</div>;
  }

  return (
    <div className="container mx-auto pt-8">
      <Image
        className="rounded-lg block mx-auto"
        src={photo.src}
        width={400}
        height={400}
        alt={photo.alt}
      />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 mt-6 leading-8">
        <p>
          <strong>Title:</strong> {photo.alt}
        </p>
        <p>
          <strong>Price:</strong> {photo.price}
        </p>
        <p>
          <strong>Desc:</strong> Cillum pariatur id cupidatat dolore enim ea
          ipsum culpa. Irure veniam velit adipisicing consectetur eu labore
          pariatur ut. Laborum in nisi amet aute dolore do. Irure mollit dolor
          ut excepteur sint.Voluptate duis est dolore velit velit irure laboris
          cillum eiusmod occaecat. Aliqua veniam esse fugiat nostrud nisi
          excepteur esse. Eu in dolore in occaecat elit dolore adipisicing
          veniam. Occaecat eiusmod reprehenderit ex eu nulla eiusmod adipisicing
          aliquip anim fugiat adipisicing ut sit consequat. Lorem anim amet
          nostrud sint aute consequat non. Nisi officia non dolor aute excepteur
          proident aute est eu veniam minim amet irure.Incididunt aute minim
          incididunt nulla fugiat do nisi consequat sint ut reprehenderit
          eiusmod duis. Eu dolor minim irure et magna do id voluptate eiusmod
          enim. Elit quis officia officia enim tempor fugiat ea velit ut
          proident in exercitation. Ad culpa sint eiusmod nostrud labore tempor
          tempor id aliqua aliqua. Aliqua tempor dolore occaecat dolore laboris
          incididunt culpa ea incididunt in. Dolor et incididunt duis ullamco ad
          exercitation enim non. Enim do dolore quis aute anim voluptate aliquip
          dolor cupidatat occaecat nostrud deserunt minim.
        </p>
      </div>
    </div>
  );
}
