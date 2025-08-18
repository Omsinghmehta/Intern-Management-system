export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Intern Management</h2>
          <p className="text-sm leading-6">
            A modern platform to manage interns and streamline task assignments, 
            feedback, and attendance tracking. Built to help managers and interns 
            collaborate effectively and stay productive.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/login" className="hover:text-blue-400">Login</a></li>
            <li><a href="/register" className="hover:text-blue-400">Register</a></li>
            <li><a href="/manager-dashboard" className="hover:text-blue-400">Manager Dashboard</a></li>
            <li><a href="/intern-dashboard" className="hover:text-blue-400">Intern Dashboard</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <p>Email: <a href="mailto:support@internms.com" className="hover:text-blue-400">support@internms.com</a></p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: New Delhi, India</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-400">Facebook</a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">Twitter</a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400">LinkedIn</a>
            <a href="https://github.com" target="_blank" className="hover:text-blue-400">GitHub</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm">
        <p>
          © {new Date().getFullYear()} Intern Management System. All rights reserved. 
        </p>
      </div>
    </footer>
  );
}
