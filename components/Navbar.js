import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import NavLogo from "../public/assets/nav.png";
import { AiOutlineShoppingCart, AiFillMinusCircle, AiFillPlusCircle, AiFillShopping } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";


const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)

    // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)

    const ref = useRef();
    const togglesideCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        } else {
            ref.current.classList.remove("translate-x-0");
            ref.current.classList.add("translate-x-full");
        }
    };

    return (
        <div className="flex flex-col md:flex-row sticky top-0 bg-white z-10 justify-center md:justify-start items-center py-2 shadow-lg sticky z-10">
            <div className="logo mx-5">
                <Link href={"/"}>
                    <Image src={NavLogo} width={200} height={40} alt="Logo" style={{ width: "175px", height: "50px" }}/>
                </Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-3 md:space-x-10 font-bold md:font-normal text-sm md:text-lg text-black md:ml-10 ">

                    <li className="hover:text-pink-500">
                        <Link href={"/"}>
                        होम
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/RegisterComplaint"}>
                        रेजिस्टर कंप्लेंट
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/press"}>
                        प्रेस
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/HeatMap"}>
                        Heat Map
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/WhoWeAre"}>
                        आम्ही कोण आहोत ?
                        </Link>
                    </li>
                    
                    
                </ul>
            </div>
            <div className="h-full flex cart items-center absolute right-0 text-3xl md:text-3xl text-pink-500 hover:text-pink-600 cursor-pointer mb-6 md:mb-0 md:mr-2">
                <div className="icon">
                    {user.value && <MdAccountCircle onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} />}
                </div>
                {!user.value && <Link href={"/login"}>
                    <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
                </Link>}
            </div>
            {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute top-7 right-10 bg-white shadow-lg border rounded-md px-5 w-32 py-4 cursor-pointer">
                <ul>
                    <li className="py-1 text-black hover:text-pink-700 text-sm font-bold"><Link href="/myaccount">My Account</Link></li>
                    <li className="py-1 text-black hover:text-pink-700 text-sm font-bold" onClick={logout}>Logout</li>
                </ul>
            </div>}
        </div>
    );
};

export default Navbar;
