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
    toast.success('Message Sent!');
    reset();
  };

  return (
    <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-6xl mx-auto m-10 dark:bg-black">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <Image
            src="/images/contact.png"
            alt="Contact illustration"
            width={300}
            height={300}
            className="rounded-full shadow-md shadow-amber-600 object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-black dark:text-white">Full Name</label>
              <input
                type="text"
                {...register('name', { required: true, minLength: 3 })}
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  Name must be at least 3 characters.
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-black dark:text-white">Subject</label>
              <input
                type="text"
                {...register('subject', { required: true, minLength: 3 })}
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              {errors.subject && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  Subject must be at least 3 characters.
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-black dark:text-white">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">Enter a valid email.</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-black dark:text-white">Message</label>
              <textarea
                {...register('message', { required: true, minLength: 10 })}
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                rows={4}
              />
              {errors.message && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
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
