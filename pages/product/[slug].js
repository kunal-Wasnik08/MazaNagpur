import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillShopping } from "react-icons/ai";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Post = ({ clearCart, buyNow, addToCart, product, variants }) => {

  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);

    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success('Your Pin Code Serviceable!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error('Sorry, Pin Code not Serviceable!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  };

  const onChangePin = (e) => {
    setPin(e.target.value)
  }


  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };




  return <>
    <section className="text-gray-600  overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={5}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className=" lg:pr-10 lg:py-6 mt-6 lg:mt-0">

            <div className="mb-5 block relative h-[56vh] md:h-[full] rounded overflow-hidden shadow-sm">
              <img
                src={product.img}
                alt="Product"
                className="object-cover object-center w-full h-full m-auto block rounded"
              />
            </div>    <h2 className="text-sm text-gray-500 tracking-widest">माझाNagpur</h2>
            <h1 className=" py-5 text-gray-900 text-3xl font-medium mb-1">{product.title}</h1>
            <p className=" text-justify leading-relaxed font-serif">{product.desc}</p>
          </div>

        </div>

      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });

  if (!product) {
    return {
      notFound: true, // Return a 404 page if the product is not found
    };
  }

  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Post;
