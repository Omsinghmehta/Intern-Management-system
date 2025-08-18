// HeroSection.jsx
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [text] = useTypewriter({
    words: [
      "Manage Interns with Ease 🚀",
      "Track Tasks, Attendance, and Progress 📊",
      "Empower Interns to Learn & Grow 🌱",
    ],
    loop: 0, 
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Intern Management System
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-10">
          A modern platform for <span className="font-bold">Managers</span> to
          assign tasks, track attendance, and give feedback — and for{" "}
          <span className="font-bold">Interns</span> to learn, submit work, and
          grow their skills.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Login
          </Link>
        </div>
      </div>
      
    </section>
  );
}
