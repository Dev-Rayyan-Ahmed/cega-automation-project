"use client"
import { login } from "@/actions/auth";
import Image from "next/image";
import { useActionState } from "react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, { error: "" });
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Header of login form */}
                <div className=" px-6 pt-6 flex flex-col justify-center items-center">
                    <Image src={'/cegalogo.svg'} alt="logo" width={'150'} height={'150'} />
                    <p className="text-sm mt-1">
                        CoWorking Management System
                    </p>
                </div>

                <form action={formAction} className="p-8 space-y-6">
                    {state?.error && (
                        <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-lg">
                            {state.error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#173e81]">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="admin@cega.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2093b3] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#173e81]">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2093b3] focus:outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full hover:bg-[#2093b3] bg-[#173e81] text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md"
                        disabled={isPending}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}