'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ContactFormInputs {
    name: string;
    subject: string;
    email: string;
    message: string;
}

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormInputs>();

    const onsubmit = () => {
        // console.log('Form payload:', data);
        toast.success('Message Sent!');
        reset();
    };

    return (
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-6xl mx-auto mt-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                    <Image
                        src="/images/contact.png"
                        alt="Contact illustration"
                        width={300}
                        height={300}
                        className="rounded-full shadow-md object-cover"
                    />
                </div>


                <div>
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1  text-gray-700">Full Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true, minLength: 3 })}
                                className="w-full border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-800 bg-white"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    Name must be at least 3 characters.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700">Subject</label>
                            <input
                                type="text"
                                {...register("subject", { required: true, minLength: 3 })}
                                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-800 bg-white"
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">
                                    Subject must be at least 3 characters.
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block mb-1 text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+\.\S+$/,
                                })}
                                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-red-800 bg-white"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">Enter a valid email.</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700">Message</label>
                            <textarea
                                {...register("message", { required: true, minLength: 10 })}
                                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-800 bg-white"
                                rows={4}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">
                                    Message must be at least 10 characters.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-900 hover:bg-red-700 text-orange-200 py-2 rounded transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}