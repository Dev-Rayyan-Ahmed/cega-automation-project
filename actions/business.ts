"use server";

import { BusinessFormData } from "@/components/forms/businessForm";
import { getSessionUser } from "@/lib/auth-utils";
import dbConnect from "@/lib/db";
import { roleBranch } from "@/lib/auth-utils";
import Business from "@/models/business.model";
import { returnResponse } from "@/lib/utils";



type BusinessItem = {
    _id: string;
    businessName: string;
    __v?: number
};

interface returnGetBusiness extends returnResponse {
    data: BusinessItem[];
}

export default async function addBusiness(businessData: BusinessFormData): Promise<returnResponse> {
    try {
        await dbConnect();
        const prevBusiness = await Business.findOne({ businessName: businessData.businessName });
        if (prevBusiness) {
            throw new Error(`${prevBusiness.businessName} is already there`);
        }

        const business = await Business.create(businessData);
        return { success: true, message: `${business.businessName} Added` };
    }
    catch (error) {
        console.log("Add Business Error", error);
        return {
            error: "internal_server_error",
            message: error instanceof Error ? error.message : "Internal Server Error",
            success: false
        };
    }
}

export async function getBusiness(): Promise<returnGetBusiness> {
    try {
        const user = await getSessionUser();

        if (!user) {
            return { error: "authentication_required", message: "Please log in to continue.", success: false, data: [] };
        }

        await dbConnect();

        let query = {};
        if (user.role !== "ADMIN") {
            const location = roleBranch[user.role];
            if (!location) return { error: "unauthorized_role", message: "Invalid role assigned.", success: false, data: [] };
            query = { businessLocation: location };
        }

        const businesses = await Business.find(query, "businessName").lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(businesses)),
            message: "business fetched successfully"
        };

    } catch (error) {
        console.error("Fetch Business Error:", error);

        return {
            error: "server_error",
            message: error instanceof Error ? error.message : "Internal Server Error",
            success: false,
            data: []
        };
    }
}