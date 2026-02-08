"use server";

import { getSessionUser, roleBranch } from "@/lib/auth-utils";
import dbConnect from "@/lib/db";
import { returnResponse } from "@/lib/utils";
import Booking from "@/models/booking.model";
import Business from "@/models/business.model";
import CoWorker from "@/models/coworker.model";
import Seat from "@/models/seats.model";


interface BookingDbResult {
    _id: any;
    coWorker: { _id: any; fullName: string; email: string } | null;
    business: { _id: any; businessName: string; businessLocation: string } | null;
    seat: { _id: any; seatNumber: string } | null;
    status: 'Active' | 'Completed' | 'Cancelled';
    isRenewed: boolean;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}

// Interface for the Flattened Data (Client use)
export interface FlatBookingColumns {
    _id: string;
    fullName: string;
    email: string;
    businessName: string;
    seatNumber: string;
    status: 'Active' | 'Completed' | 'Cancelled';
    isRenewed: boolean;
    startDate: string;
    endDate: string;
}

export interface ReturnGetBookings extends returnResponse {
    data: FlatBookingColumns[];
}

export async function getBookings(): Promise<ReturnGetBookings> {
    try {
        const user = await getSessionUser();

        if (!user) {
            return { error: "authentication_required", message: "Please log in.", success: false, data: [] };
        }

        await dbConnect();

        let query = {};
        if (user.role !== "ADMIN") {
            const location = roleBranch[user.role];
            if (!location) return { error: "unauthorized_role", message: "Invalid role.", success: false, data: [] };

            const localBusinesses = await Business.find({ businessLocation: location }).select('_id');
            const businessIds = localBusinesses.map(b => b._id);
            query = { business: { $in: businessIds } };
        }

        const bookings = (await Booking.find(query)
            .populate("coWorker", "fullName email")
            .populate("business", "businessName businessLocation")
            .populate("seat", "seatNumber")
            .lean()) as unknown as BookingDbResult[];


        // Inside getBookings()...
        const flatData: FlatBookingColumns[] = bookings.map((b) => ({
            _id: b._id.toString(),
            fullName: b.coWorker?.fullName || "N/A",
            email: b.coWorker?.email || "N/A",
            businessName: b.business?.businessName || "N/A",
            seatNumber: b.seat?.seatNumber || "N/A",
            status: b.status || 'Active',
            isRenewed: b.isRenewed || false,
            startDate: b.startDate ? b.startDate.toISOString() : "",
            endDate: b.endDate ? b.endDate.toISOString() : "",
        }));

        return {
            success: true,
            data: flatData,
            message: "Bookings fetched successfully"
        };

    } catch (error) {
        console.error("Fetch Bookings Error:", error);
        return {
            error: "server_error",
            message: error instanceof Error ? error.message : "Internal Server Error",
            success: false,
            data: []
        };
    }
}