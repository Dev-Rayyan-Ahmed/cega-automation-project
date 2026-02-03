import mongoose, { Schema, Document, Model, Types } from "mongoose";

enum BusinessStage {
    Idea = 'Idea',
    EarlyStage = 'Early Stage',
    ProtoType = 'ProtoType',
    RevenueGenerating = 'Revenue Generating'
}

enum Branch {
    Lahore = 'LHR',
    Karachi = 'KHI'
}

export interface IBusiness extends Document {
    businessName: string;
    businessStage: BusinessStage;
    location: Branch,
    description: string;
    problemSolved: string;
    assets: string;
    coWorkers: Types.ObjectId[] | string[];
    createdAt: Date;
    updatedAt: Date;
}

const businessSchema = new Schema<IBusiness>({
    businessName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    businessStage: {
        type: String,
        enum: Object.values(BusinessStage),
        required: true,
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    problemSolved: {
        type: String,
        required: true,
        trim: true
    },
    assets: {
        type: String,
        required: true,
        trim: true
    },

    coWorkers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CoWorker"
        }
    ]



}, { timestamps: true });


const Business: Model<IBusiness> = mongoose.models.Business || mongoose.model("Business", businessSchema);

export default Business;