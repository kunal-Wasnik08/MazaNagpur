import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
const Slideshow = () => {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
    const videoRef = useRef(null);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (autoplay) {
            video.play();
        } else {
            video.pause();
        }
    }, [autoplay]);

    return (
        <div className=' rounded-md' >
            <Fade indicators={false} arrows={true}  >
                <div className="relative text-center h-[90vh]">
                    <img src="/banner1.png" alt="" className="w-full h-auto" />
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text space-y-10">
                            <h1 className='md:text-5xl font-bold'><span className='text-orange-500'>माझा नागपूर माझी जबाबदारी</span></h1>
                            <button className="Register-complaint bg-pink-500 px-2 py-2 md:px-7 md:py-4 border rounded-full font-bold text-white hover:bg-pink-400">
                                <Link href="/RegisterComplaint" className="link"> <i className=" uil uil-user mr-2" /> Register Complaint</Link>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative text-center h-[90vh]">
                    <video
                        ref={videoRef}
                        src="https://www.nmcnagpur.gov.in/assets/cdma/images/lv_0_20230428173812.mp4"
                        controls
                        className='w-full'
                        onEnded={() => setAutoplay(false)}
                        onClick={() => setAutoplay(true)}
                    />
                </div>
            </Fade>
        </div>
    );
};

export default Slideshow;