'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen space-y-8 text-center p-6">
            <motion.h1
                className="text-6xl font-extrabold text-red-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>

            <motion.p
                className="text-lg max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Oops! The page you are looking for does not exist.
                Maybe you mistyped the address or the page was moved.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Go back Home
                </Link>
            </motion.div>
        </main>
    )
}
