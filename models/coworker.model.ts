import mongoose, { Schema, Document, Model } from "mongoose";


enum GENDER {
    Male = 'Male',
    Female = 'Female',
}

export interface ICoWorker extends Document {
    fullName: string;
    DOB: Date;
    gender: GENDER;
    nationality: string;
    phoneNo: string;
    CNIC: string;
    email: string;
    residentAddress: string;
    lockerNo: string;
    dateOfJoining: Date;
    emergencyContactName: string;
    emergencyPhoneNo: string;
    relationship: string;
}

const CoWorkerSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    DOB: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        enum: Object.values(GENDER),
        required: true
    },
    nationality: {
        type: String,
        required: true,
        default: 'Pakistani'
    },
    phoneNo: {
        type: String,
        required: true
    },
    CNIC: {
        type: String,
        required: [true, 'CNIC is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    residentAddress: {
        type: String,
        required: true
    },
    locker: {
        type: String,
        unique: true,
        sparse: true // Allows multiple nulls if some coworkers don't have lockers
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    emergencyContactName: {
        type: String,
        required: true
    },
    emergencyPhoneNo: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },

    businessAssociated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    }
}, {
    timestamps: true
});


const CoWorker: Model<ICoWorker> = mongoose.model<ICoWorker>("CoWorker", CoWorkerSchema);

export default CoWorker;