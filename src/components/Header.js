// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import SearchInput from "./SearchInput";

// export default function Header() {
//   const { data: session } = useSession();
//   const [term, setTerm] = useState("");
//   const router = useRouter();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.push(`/listings?search=${encodeURIComponent(term)}`);
//   };


//   return (
//     <header className="bg-white text-blue-600 shadow sticky top-0 z-50">
//       <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
//         <Link href="/" className=" flex items-center h-10 text-2xl font-bold hover:text-yellow-300">
//           <img src="/icons/webicon.svg" alt="Logo" className="h-8 w-8" />
//           <img src="/icons/name.svg" alt="Logo" className=" ml-4 h-20 w-20" />
//         </Link>

//         {/* nav links*/}
//         <div className="flex items-center space-x-6 ml-8">
//           <Link href="/" className="hover:text-yellow-300">Home</Link>
//           <Link href="/listings" className="hover:text-yellow-300 mr-5">Listings</Link>
//           {/* SEARCH*/}
//           <form
//             onSubmit={handleSubmit}
//             className="flex-1 mx-4 max-w-5xl flex "
//             role="search"
//             aria-label="Site search"
//           >
//             <SearchInput
//               value={term}
//               onChange={(e) => setTerm(e.target.value)}
//               placeholder="Search for products, brands and more"
//               className="w-180 h-8 pl-3 outline-none rounded-l bg-white text-gray-900 mr-5"
//             />
//             <button type="submit" className="bg-yellow-400 px-4 rounded-r text-blue-900 hover:bg-yellow-300">
//               <FaSearch />
//             </button>
//           </form>
//           {session ? (
//             <>
//               <div className="relative flex items-center space-x-4" ref={dropdownRef}>
//                 <button onClick={() => setShowDropdown(!showDropdown)} aria-label="User Account">
//                   <img src="/icons/user-icon.svg" alt="User" className="h-7 w-7" />
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute top-10 right-0 mt-2 w-40 bg-white shadow-md rounded-md  z-50">
//                     <Link
//                       href="/profile"
//                       className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                       href="/sell"
//                       className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
//                     >
//                       Sell
//                     </Link>
//                     <button
//                       onClick={() => signOut()}
//                       className="w-full text-left block px-4 py-2 text-blue-900 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <Link href="/signup" className="hover:text-yellow-300">Sign Up</Link>
//               <Link href="/login" className="hover:text-yellow-300 ">Login</Link>
//             </>
//           )}
//         </div>

//       </nav>
//     </header>
//   );
// }


// Header.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"; // Import FaBars and FaTimes
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import Image from "next/image"; // Import Image component

export default function Header() {
  const { data: session } = useSession();
  const [term, setTerm] = useState("");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);
  const menuRef = useRef(null); // Ref for mobile menu

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/listings?search=${encodeURIComponent(term)}`);
    setIsMenuOpen(false); // Close menu after search
  };


  return (
    <header className="bg-white text-blue-600 shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center h-8 sm:h-10 text-xl sm:text-2xl font-bold hover:text-yellow-300"> {/* Adjusted size */}
          <div className="relative h-6 w-6 sm:h-8 sm:w-8"> {/* Wrapper for Image */}
            <Image src="/icons/webicon.svg" alt="Logo" fill style={{ objectFit: 'contain' }} sizes="24px" /> {/* Changed img to Image */}
          </div>
          <div className="relative ml-2 sm:ml-4 h-16 w-16 sm:h-20 sm:w-20"> {/* Wrapper for Image */}
            <Image src="/icons/name.svg" alt="Logo" fill style={{ objectFit: 'contain' }} sizes="80px" /> {/* Changed img to Image */}
          </div>
        </Link>

        {/* Hamburger menu for small screens */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-600 focus:outline-none" aria-label="Open menu">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* nav links and search - hidden on small, flex on medium and up */}
        <div className={`md:flex items-center space-x-6 flex-1 justify-end ${isMenuOpen ? 'block absolute top-full left-0 w-full bg-white shadow-md py-2 px-4' : 'hidden'}`} ref={menuRef}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 w-full md:w-auto">
            <Link href="/" className="hover:text-yellow-300 py-1 md:py-0" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/listings" className="hover:text-yellow-300 py-1 md:py-0" onClick={() => setIsMenuOpen(false)}>Listings</Link>
            
            {/* SEARCH */}
            <form
              onSubmit={handleSubmit}
              className="flex w-full md:w-auto md:flex-1 md:max-w-md"
              role="search"
              aria-label="Site search"
            >
              <SearchInput
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 h-8 pl-3 outline-none rounded-l bg-gray-100 text-gray-900 min-w-0"
              />
              <button type="submit" className="bg-yellow-400 px-3 sm:px-4 rounded-r text-blue-900 hover:bg-yellow-300 flex items-center justify-center">
                <FaSearch /> <span className="hidden sm:inline ml-1">Search</span> {/* Added text for larger screens */}
              </button>
            </form>

            {session ? (
              <div className="relative flex items-center space-x-4 mt-2 md:mt-0" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} aria-label="User Account" className="flex items-center">
                  <div className="relative h-7 w-7"> {/* Wrapper for Image */}
                    <Image src="/icons/user-icon.svg" alt="User" fill style={{ objectFit: 'contain' }} sizes="28px" /> {/* Changed img to Image */}
                  </div>
                  <span className="ml-2 text-blue-900">{session.user.name || 'Account'}</span>
                </button>

                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                      onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/sell"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                      onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                    >
                      Sell
                    </Link>
                    <button
                      onClick={() => { signOut(); setShowDropdown(false); setIsMenuOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-blue-900 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
                <Link href="/signup" className="hover:text-yellow-300 py-1 md:py-0" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                <Link href="/login" className="hover:text-yellow-300 py-1 md:py-0" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}