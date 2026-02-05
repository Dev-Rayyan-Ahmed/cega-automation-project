import { getSessionUser, roleBranch } from "@/lib/auth-utils";
import dbConnect from "@/lib/db";
import { returnResponse } from "@/lib/utils";
import Seat from "@/models/seats.model";

type SeatItem = {
    _id: string;
    seatNumber: string;
};

interface returnGetSeats extends returnResponse {
    data: SeatItem[];
}

export async function getSeats(): Promise<returnGetSeats> {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { error: "authentication_required", message: "Please log in to continue.", success: false, data: [] };
        };


        await dbConnect();
        let query: {} = {};
        if ("ADMIN" != user.role) {
            const location = roleBranch[user.role];
            if (!location) return { error: "unauthorized_role", message: "Invalid role assigned.", success: false, data: [] };
            query = { branch: roleBranch[user.role] };
        }
        query = { ...query, isOccupied: false }

        const seats = await Seat.find(query, "seatNumber").lean();
        return {
            success: true,
            message: " seats fetched successfully",
            data: JSON.parse(JSON.stringify(seats))
        }


    } catch (error) {
        console.error("Fetch Seats Error:", error);

        return {
            error: "server_error",
            message: error instanceof Error ? error.message : "Internal Server Error",
            success: false,
            data: []
        };

    }
}



export async function createSeats() {
    await dbConnect();

    for (let index = 0; index < 59; index++) {
        const number = String(index)
        const seat = await Seat.create({
            seatNumber: `LHR-${number.padStart(2, '0')}`,
            branch: "Lahore"
        });
        console.log(seat);
    }

}