import mongoose from "mongoose";


const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    throw new Error("Please define the DB_URI environment variable in .env.local");
}

/** * In Next.js, we use a global variable to store the connection 
 * so it survives across Hot Module Reloads (HMR).
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global type to include our mongoose cache OTHER WISE TS WILL SAY  global does not have mongoose
declare global {
    var mongoose: MongooseCache;
}

// If the global object doesn't have a mongoose cache yet, create it (particularly when the system is cold started (server less functions are turned off))
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }; // first global.mongoose ={} then cached = global.mongoose
}

async function dbConnect() {
    // if the connection is already persist do not make a new connection to db 
    if (cached.conn) {
        return cached.conn;
    }

    // If someone is currently connecting, wait for the existing promise to resolve 
    if (!cached.promise) {
        const opts = {
            dbName: "cega-automation",
            bufferCommands: false, // Stop Mongoose from queuing commands if the connection is down (bad for serverless cuz of timeout)
        };

        cached.promise = mongoose.connect(DB_URI!, opts).then((mongoose) => {
            console.log("DataBase Connected");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset promise on error so we can try again
        throw e;
    }

    return cached.conn;
}

export default dbConnect;