import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^@]+\.[^@]+$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isverified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword(password: string): Promise<boolean>;

};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: (value: string) => {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        },
        unique: true

    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
        minlength: [6, "Password must be at least 6 characters"],
    },

    avatar: {
        public_id: String,
        url: String
    },

    role: {
        type: String,
        default: "user"
    },

    isverified: {
        type: Boolean,
        default: false
    },

    courses: [
        {
            courseId: String
        }
    ]
}, {
    timestamps: true
});

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};


const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
