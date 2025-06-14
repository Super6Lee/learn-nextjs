import React from "react"
import Hero from "@/components/hero"
import scaleImage from "../../../public/images/scale.png"

export default function Scale() {
  
  return (
    <Hero imgUrl={scaleImage} altText="scale Image" content="Scale ~~~ " />
  )
}
