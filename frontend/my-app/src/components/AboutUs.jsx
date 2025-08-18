import { motion } from "framer-motion";
import image from '../assets/image.png'
export default function AboutUs() {
  return (
    <section className="bg-gray-300 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Image */}
          <motion.img
            src={image}
            alt="About Us"
            className="rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Right Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to the <span className="font-semibold">Intern Management System</span> – a modern
              platform built to simplify the connection between interns and managers. 
              We aim to create an environment where learning, growth, and productivity
              go hand-in-hand.  
            </p>

            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to provide managers with the right tools to track 
              attendance, assign tasks, and share feedback, while enabling interns 
              to improve their skills and showcase their work effectively.  
            </p>

            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Why Choose Us?
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>✔ Simple and intuitive design</li>
              <li>✔ Real-time task and feedback system</li>
              <li>✔ Boosts productivity and learning experience</li>
              <li>✔ Secure authentication and role-based access</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
