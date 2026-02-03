"use server"

import dbConnect from "@/lib/db"
import User from "@/models/user.model";

export default async function test() {
    // console.log("Current URI:", process.env.MONGODB_URI);
    await dbConnect();

    try {
        const user = await User.create(
            {
                username: "amibaxyc",
                email: "amibaxyc@gmail.com",
                password: "123ukasha",
                role: "ADMIN"
            }
        );
        console.log(user);
    } catch (error) {
        if (error instanceof Error)
            console.error("Error", error.message)
        else console.error("Internal Server Error")
    }
}