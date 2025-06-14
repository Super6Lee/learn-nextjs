import React from "react"
import Hero from "@/components/hero"
import homeImage from "../../public/images/home.png"

export default function Home() {
  
  return (
    <Hero imgUrl={homeImage} altText="home Image" content="Professional Cloud Hosting" />
  )
}
