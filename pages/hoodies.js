import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";
import mongoose from "mongoose";


const hoodies = ({ products }) => {
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
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <p className="mt-1 text-gray-600 text-sm space-x-1">

                    {products[item].size[0].includes("S") && <span className="border border-gray-300 px-1">S</span>}
                    {products[item].size[0].includes("M") && <span className="border border-gray-300 px-1">M</span>}
                    {products[item].size[0].includes("L") && <span className="border border-gray-300 px-1">L</span>}
                    {products[item].size[0].includes("XL") && <span className="border border-gray-300 px-1">XL</span>}
                    {products[item].size[0].includes("XXL") && <span className="border border-gray-300 px-1">XXL</span>}
                   
                </p>
                <p className="mt-1 text-gray-600 text-sm space-x-1">
                        {products[item].color[0].includes("red") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-red-700 hover:bg-red-600 w-6 h-6 focus:outline-none"></button>
                        )}

                        {products[item].color[0].includes("green") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-blue-700 hover:bg-blue-600 w-6 h-6 focus:outline-none"></button>
                        )}

                        {products[item].color[0].includes("black") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-black hover:bg-black w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color[0].includes("white") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-white hover:bg-white w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color[0].includes("pink") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-pink-700 hover:bg-pink-600 w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color[0].includes("green") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-green-700 hover:bg-green-600 w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color[0].includes("yellow") && (
                          <button className="border-2 border-gray-300 rounded-full bg-none bg-yellow-700 hover:bg-yellow-600 w-6 h-6 focus:outline-none"></button>
                        )}
                      </p>

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
  let products = await Product.find({ category: "hoodies" })
  let hoodies = {}
  for (let item of products) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color[0].includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color)
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size)
      }
    }

    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color]
        hoodies[item.title].size = [item.size]
      }
    }
  }


  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) }, // will be passed to the page component as props
  }
}

export default hoodies