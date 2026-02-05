import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

type CustomJwtPayload = {
    id: string;
    role: string;
}

export async function getSessionUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) return null;
    return await decrypt(token);
}

async function decrypt(token: string) {
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");

        const payload = verify(token, SECRET_KEY) as CustomJwtPayload;
        return payload;
    } catch (error) {
        console.error("Auth Error:", error);
        return null;
    }
}


export async function getLocationOptions() {

    const user = await getSessionUser();
    if (!user) {
        return [];
    };

    const { role } = user;
    if (role == "KHI-ADMIN") return ["Karachi"];
    else if (role == "LHR-ADMIN") return ["Lahore"];
    else return ["Karachi", "Lahore"];
}



export const roleBranch: Record<string, string> = {
    "KHI-ADMIN": "Karachi",
    "LHR-ADMIN": "Lahore",
    "ADMIN": "All",

}