import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
};

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });



userSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) // this points to document here not query(model)
        return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        throw new Error("Encryption failed");
    }

});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}


// in express
// const User = mongoose.model<IUser>("User", userSchema);
// in next js serverless function will run again and again so if model is created then no need to create the model again as Mongoose's internal registry of models is not wiped out(in development).

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);
export default User;