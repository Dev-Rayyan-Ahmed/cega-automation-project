import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
    coWorker: Types.ObjectId;
    business?: Types.ObjectId;
    seat: Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    amountPaid: number;
    status: 'Active' | 'Completed' | 'Cancelled';
}

const bookingSchema = new Schema<IBooking>({
    coWorker: {
        type: Schema.Types.ObjectId,
        ref: "CoWorker",
        required: [true, "A booking must belong to a coworker"]
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: "Business"
    },
    seat: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
        required: [true, "A seat must be assigned for a booking"]
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    amountPaid: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default: 'Active'
    }
}, { timestamps: true });

// Indexing for faster lookups on active bookings
bookingSchema.index({ status: 1, coWorker: 1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;