"use client";
import React from "react";

export default function SearchInput({
  value,
  onChange,
  type = "text",
  className = "",
  placeholder = "",
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full ${className}`} // Ensure it takes full width within its container
      {...props}
    />
  );
}
