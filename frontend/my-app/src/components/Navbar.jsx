import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/logo.webp'
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/authSlice";
export default function Navbar() {

  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth);
  const dispatch=useDispatch()
  const handleLogout = () => {

    dispatch(setCredentials({user:null}));
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md sticky top-0 z-50 h-20  py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide flex hover:text-yellow-300 transition">
          <img src={logo} className="h-10 w-auto bg-black mr-3 rounded"/>
            Intern<span className="text-yellow-300">Sphere</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex space-x-6 font-medium justify-center items-center">
            <Link
              to="/"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
            {user ? (
              <>
                {user.role === "manager" && (
                  <Link
                    to="/manager-dashboard"
                    className="hover:text-yellow-300 transition"
                  >
                    Dashboard
                  </Link>
                )}

                {user.role === "intern" && (
                <>
                  <Link
                    to="/intern-dashboard"
                    className="hover:text-yellow-300 transition"
                  >
                    Dashboard
                  </Link>

                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-yellow-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-yellow-300 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
