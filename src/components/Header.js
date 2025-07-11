// "use client";
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';

// export default function Header() {
//   const { data: session } = useSession();
//   return (
//     <header>
//       <Link href="/">Home</Link>
//       <Link href="/listings">Listings</Link>
//       {session ? (
//         <>
//           <Link href="/sell">Sell</Link>
//           <Link href="/profile">Profile</Link>
//           <button onClick={() => signOut()}>Logout </button>
//         </>
//       ) : (
//         <>
//           <Link href="/signup">Sign Up</Link>
//           <Link href="/login">Login</Link>
//         </>
//       )}
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export default function Header() {
  const { data: session } = useSession();
  const [term, setTerm] = useState("");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/listings?search=${encodeURIComponent(term)}`);
  };

  // async function getSuggestions(query) {
  //   const res = await fetch(`/api/items?search=${encodeURIComponent(query)}&limit=5`);
  //   const payload = await res.json();
  //   return payload.items || payload;
  // }

  return (
    <header className="bg-white text-blue-600 shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="text-2xl font-bold hover:text-yellow-300">
          Flipcart
        </Link>

        {/* nav links */}
        <div className="flex items-center space-x-6 ml-8">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/listings" className="hover:text-yellow-300">Listings</Link>
          {/* SEARCH FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 mx-4 max-w-5xl flex "
            role="search"
            aria-label="Site search"
          >
            <SearchInput
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-180 h-8 pl-3 outline-none rounded-l bg-white text-gray-900"
            />
            <button type="submit" className="bg-yellow-400 px-4 rounded-r text-blue-900 hover:bg-yellow-300">
              <FaSearch />
            </button>
          </form>
          {session ? (
            <>
              <div className="relative flex items-center space-x-4" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} aria-label="User Account">
                  <img src="/icons/user-icon.svg" alt="User" className="h-7 w-7" />
                </button>

                {showDropdown && (
                  <div className="absolute top-10 right-0 mt-2 w-40 bg-white shadow-md rounded-md  z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/sell"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                    >
                      Sell
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left block px-4 py-2 text-blue-900 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/signup" className="hover:text-yellow-300">Sign Up</Link>
              <Link href="/login" className="hover:text-yellow-300 ">Login</Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}
