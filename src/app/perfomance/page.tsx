import React from "react"
import Hero from "@/components/hero"
import perfomanceImage from "../../../public/images/performance.png"

export const metadata = {
  title: "Perfomance",
  description: "Perfomance Page",
}

export default function Perfomance() {
  
  return (
    <Hero imgUrl={perfomanceImage} altText="performance Image" content="Perfomance ~~~ " />
  )
}
