"use client";
import React from "react";
import { photos } from "@/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const photo = photos.find((item) => item.id === params.id);

  if (!photo) {
    return <div>Photo Not Found</div>;
  }

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-gray-500/[.8]"
      onClick={() => router.back()}
    >
      <Image
        className="rounded-lg "
        src={photo.src}
        width={400}
        height={400}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
