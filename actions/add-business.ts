"use server";

import { BusinessFormData } from "@/components/forms/businessForm";
import dbConnect from "@/lib/db";
import Business from "@/models/business.model";

interface returnAddBusiness {
    success: boolean,
    error?: string,
    message?: string
}

export default async function addBusiness(businessData: BusinessFormData): Promise<returnAddBusiness> {
    try {
        await dbConnect();
        const prevBusiness = await Business.findOne({ businessName: businessData.businessName });
        if (prevBusiness) {
            throw new Error(`${prevBusiness.businessName} is already there`)
        }

        const business = await Business.create(businessData);
        return { success: true, message: `${business.businessName} Added` };
    }
    catch (error) {
        if (error instanceof Error) {
            return { error: error.message, success: false }
        }
        return { error: "Something went wrong", success: false }
    }
}