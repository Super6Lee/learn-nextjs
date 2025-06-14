import React from "react"
import Hero from "@/components/hero"
import homeImage from "../../../public/images/home.png"

export const metadata = {
  title: "Home",
  description: "Home Page",
}

export default function Home() {
  
  return (
    <Hero imgUrl={homeImage} altText="home Image" content="Professional Cloud Hosting" />
  )
}
