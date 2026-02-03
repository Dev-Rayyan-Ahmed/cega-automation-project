'use server'

import { cookies } from 'next/headers';
import { sign } from "jsonwebtoken";
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import User from '@/models/user.model';

const SECRET_KEY = process.env.JWT_SECRET;
type ActionState = {
    error?: string;
    success?: boolean;
};

export async function login(initialValue: ActionState, formData: FormData): Promise<ActionState> {
    await dbConnect()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await User.findOne({ email: email });
    if (!user) {
        return { error: "Invalid email or password" };
    }

    const isValid = await user.isPasswordCorrect(password);
    if (!isValid) {
        return { error: "Invalid email or password" };
    }


    const token = sign({ id: user._id, role: user.role }, SECRET_KEY!, { expiresIn: '1d' });
    // console.log(token, SECRET_KEY)

    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',    // CSRF protection
        path: '/',          // so that cookie must available in whole site
        maxAge: 60 * 60 * 24
    });

    redirect('/dashboard');
}


export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
    redirect('/login');
}