"use server";

import { coWorkerFormData } from "@/components/forms/coWorkerForm";
import dbConnect from "@/lib/db";
import { returnResponse } from "@/lib/utils";
import Booking from "@/models/booking.model";
import Business from "@/models/business.model";
import CoWorker from "@/models/coworker.model";
import Seat from "@/models/seats.model";

export async function addCoworker(coWorkerData: coWorkerFormData): Promise<returnResponse> {
    try {
        await dbConnect();

        const existing = await CoWorker.findOne({
            $or: [
                { phone: coWorkerData.phone },
                { cnic: coWorkerData.cnic },
                { email: coWorkerData.email }
            ]
        });

        if (existing) {
            return { success: false, error: "duplicate_entry", message: "Coworker with this Phone, CNIC, or Email already exists." };
        }

        const newCoWorker = await CoWorker.create({
            fullName: coWorkerData.fullName,
            dateOfBirth: new Date(coWorkerData.dateOfBirth),
            gender: coWorkerData.gender,
            nationality: coWorkerData.nationality,
            phone: coWorkerData.phone,
            cnic: coWorkerData.cnic,
            email: coWorkerData.email,
            business: coWorkerData.business,
            address: coWorkerData.address,
            lockerNo: coWorkerData.lockerNo,
            dateOfJoining: new Date(coWorkerData.dateOfJoining),
            emergencyContactName: coWorkerData.emergencyContactName,
            emergencyPhoneNo: coWorkerData.emergencyPhoneNo,
            relationship: coWorkerData.relationship,
        });

        const updatedBusiness = await Business.findByIdAndUpdate(
            coWorkerData.business,
            { $push: { coWorkers: newCoWorker._id } },
            { new: true }
        );

        const updatedSeat = await Seat.findByIdAndUpdate(coWorkerData.seat, { isOccupied: true });
        if (!updatedSeat) {
            return { success: false, error: "not_found", message: "Seat not found" };
        }

        const startDate = new Date(coWorkerData.dateOfJoining);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 6);

        await Booking.create({
            coWorker: newCoWorker._id,
            business: coWorkerData.business,
            seat: coWorkerData.seat,
            startDate: startDate,
            endDate: endDate,
        });

        return { success: true, message: "Registration and Booking completed successfully!" };

    } catch (error) {
        console.error("Add Coworker Error:", error);
        return {
            success: false,
            error: "server_error",
            message: error instanceof Error ? error.message : "Internal Server Error"
        };
    }
}