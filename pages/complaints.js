import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";
import mongoose from "mongoose";


const complaints = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((item) => {
            return <Link key={products[item]._id} href={`/product/${products[item].slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
              <div className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="mx-auto h-[36vh] block" src={products[item].img} />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Press</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>

              </div>
            </Link>

          })}


        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readystate) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "press" })
  let press = {}
  for (let item of products) {
    if (item.title in press) {
      if (!press[item.title].color[0].includes(item.color) && item.availableQty > 0) {
        press[item.title].color.push(item.color)
      }
      if (!press[item.title].size.includes(item.size) && item.availableQty > 0) {
        press[item.title].size.push(item.size)
      }
    }

    else {
      press[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        press[item.title].color = [item.color]
        press[item.title].size = [item.size]
      }
    }
  }


  return {
    props: { products: JSON.parse(JSON.stringify(press)) }, // will be passed to the page component as props
  }
}

export default complaints