"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"

const Signup = () => {
  // State variables to store user input
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(userDetails); // Log the user input to the console
    setUserDetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          <Heart className="inline-block mr-2 text-pink-500" size={28} />
          Campus Connection
        </CardTitle>
        <CardDescription className="text-center">
          Create an account to find your perfect match
        </CardDescription>
      </CardHeader>

      {/* Form Content */}
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={userDetails.password}
                onChange={handleInputChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="text-black dark:text-white text-sm" />
                ) : (
                  <EyeOff className="text-black dark:text-white text-sm" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye className="text-black dark:text-white text-sm" />
                ) : (
                  <EyeOff className="text-black dark:text-white text-sm" />
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
            Sign Up
          </Button>
        </form>

        {/* Divider for social sign up */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline" onClick={() => signIn("google",{ redirectTo: "/home" })}>
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
            </svg>
            Google
          </Button>
        </div>
      </CardContent>

      {/* Footer with navigation links */}
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="mr-1 inline-block">Already have an account?</span>
          <Link href="/login" className="underline hover:text-primary">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Signup;
