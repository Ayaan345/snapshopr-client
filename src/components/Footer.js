export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="font-bold mb-2">Customer Service</h3>
          <ul>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">About Us</h3>
          <ul>
            <li><a href="#" className="hover:underline">Company Info</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Legal</h3>
          <ul>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Social Media</h3>
          <ul>
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-8 text-sm">
        &copy; {new Date().getFullYear()} Flipcart. All rights reserved.
      </div>
    </footer>
  );
}