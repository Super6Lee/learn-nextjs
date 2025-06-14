import React from "react"
import Hero from "@/components/hero"
import reliabilityImage from "../../../../public/images/reliability.png"

export const metadata = {
  title: "Reliability",
  description: "Reliability Page",
}

export default function Reliability() {
  return (
    <Hero imgUrl={reliabilityImage} altText="reliability Image" content="Reliability ~~~ " />
  )
}
