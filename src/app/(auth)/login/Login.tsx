"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserDetail {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<UserDetail>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetail((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userDetail);
        setUserDetail({
            email: "",
            password: ""
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
                    Enter your email and password to login
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            value={userDetail.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className='relative'>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={userDetail.password}
                                onChange={handleChange}
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
                    <Button className="w-full bg-pink-500 hover:bg-pink-600" type="submit">
                        Sign In
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                        </svg>
                        Google
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                    <span className="mr-1 inline-block">Don&apos;t have an account?</span>
                    <Link href="/signup" className="underline hover:text-primary">
                        Sign up
                    </Link>
                </div>
                <Link href="/forgot-password" className="text-sm text-muted-foreground underline hover:text-primary">
                    Forgot password?
                </Link>
            </CardFooter>
        </Card>
    );
};

export default Login;