import React from "react";

import { Metadata } from "next";
import BlogList from "@/components/blogList";

export const metadata: Metadata = {
    title: "Blog",
    description: "Blog",
}

export default function Page() {
  return (
    <BlogList></BlogList>
  );
}
