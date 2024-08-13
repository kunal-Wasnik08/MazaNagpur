import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterComplaint() {
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


    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState([]);
    console.log(image);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        complaint: "",
        image: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await uploadImage(image);
        } catch (error) {
        }
    }

    function coverToBase64(e) {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            console.error('File is not an image');
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.error("Error: ", error)
        };
    }
    const [location, setLocation] = useState(null);
    const [loading, setloading] = useState(false)

    async function uploadImage(image) {
        setloading(true)
        try {
            const response = await fetch('http://localhost:3000/api/addImage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    base64: image,
                    name: formData.name,
                    email: formData.email,
                    complaint: formData.complaint,
                    location: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    }
                })
            });
            const data = await response.json();
            if (!data?.error) {
                toast.success(data?.message)

            } else {
                toast.error(data?.error)
            } 
            getImage();
            setloading(false)
        } catch (error) {
            console.error('Error uploading image:', error);
            setloading(false)
            toast.error(error.message)
            throw error; // Propagate the error to the caller

        }
    }

    useEffect(() => {
        getImage();
    }, []);

    function getImage() {
        fetch('http://localhost:3000/api/getImage', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllImage(data.data || []); // Ensure allImage is properly initialized
            })
            .catch((error) => console.error('Error fetching images:', error));
    }



    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, (error) => {
                toast.error('Error getting location:', error);
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }, []);



    return (
        <>
            <div className="container mx-auto my-12 text-black">
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
                <h2 className="text-3xl font-bold mb-6">Register a Complaint</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="complaint" className="block text-gray-700 text-sm font-bold mb-2">Complaint</label>
                        <textarea id="complaint" name="complaint" value={formData.complaint} onChange={handleChange} className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                        <input type="file" id="image" name="image" onChange={coverToBase64} accept="image/*" className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 mb-2" />
                        {image && <img className='border border-solid border-2 border-sky-200 my-2' width={100} height={100} src={image} />}
                        <div className="mt-4 flex items-center">
                            <input
                                onChange={onChangePin}
                                type="text"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                                placeholder="Enter Your Pin Code"
                            />
                            <button
                                onClick={checkServiceability}
                                type='button'
                                className="ml-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none"
                            >
                                Check Serviceability
                            </button>

                        </div>
                        {!service && service != null && <div className="text-red-700 text-sm mt-3">
                            Sorry! This pincode is not serviceable
                        </div>}
                        {service && service != null && <div className="text-green-700 text-sm mt-3">
                            Yay! This pincode is serviceable
                        </div>}



                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4">{loading ? "Submitting..." : "Submit"}</button>
                        <br />
                    </div>
                </form>

                <section >
                    <div className="container px-5 py-24 mx-auto">
                        <h1 className='text-3xl text-black font-bold'>Registered Complaints</h1>
                        <div className="flex flex-wrap -m-4">
                            {/* {Object.keys(products).map((item) => {
                                return <Link key={data._id} href={`/product/${data.slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                                    <div className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="mx-auto h-[36vh] block" src={data.img} />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Press</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{data.title}</h2>

                                    </div>
                                </Link>

                            })} */}


                            {allImage.map(data => {
                                return <Link key={data._id} href={'/RegisterComplaint'} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                                    <div className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="mx-auto h-[36vh] block" src={data.image} />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Press</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{data.name}</h2>

                                    </div>

                                </Link>


                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}


export default RegisterComplaint;
