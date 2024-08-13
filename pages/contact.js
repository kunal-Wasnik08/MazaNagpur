import React from 'react';

function ContactUs() {
    return (
        <div className="container mx-auto my-12 text-black">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="mb-4">Have a question or feedback? Reach out to us using the form below:</p>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
