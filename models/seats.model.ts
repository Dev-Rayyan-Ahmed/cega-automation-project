import mongoose, { Schema, Document, Model, Types } from "mongoose";

enum Branch {
    Lahore = 'Lahore',
    Karachi = 'Karachi'
}

export interface ISeat extends Document {
    seatNumber: string;
    branch: Branch;
    bookingDetails?: Types.ObjectId;
    isOccupied: boolean;
}

const seatSchema = new Schema<ISeat>({
    seatNumber: {
        type: String,
        required: [true, 'Seat number is required'],
        trim: true
    },
    branch: {
        type: String,
        enum: Object.values(Branch),
        required: [true, 'Branch location is required']
    },
    bookingDetails: {
        type: Schema.Types.ObjectId,
        ref: "Booking"
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Compound Index: Ensures seat "A1" can exist in both Lahore and Karachi, 
// but you can't have two "A1" seats in the same branch.
seatSchema.index({ seatNumber: 1, branch: 1 }, { unique: true });

const Seat: Model<ISeat> = mongoose.models.Seat || mongoose.model<ISeat>("Seat", seatSchema);

export default Seat;