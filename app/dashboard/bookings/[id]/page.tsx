import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Booking from "@/models/booking.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    User,
    Briefcase,
    Armchair,
    RefreshCcw,
    Clock,
    MapPin,
    ChevronLeft
} from "lucide-react";

// Registering models
import "@/models/coworker.model";
import "@/models/business.model";
import "@/models/seats.model";
import { statusColors } from "@/lib/utils";


interface PopulatedCoWorker {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
}

interface PopulatedBusiness {
    _id: string;
    businessName: string;
    businessLocation: string;
}

interface PopulatedSeat {
    _id: string;
    seatNumber: string;
}

interface PopulatedBooking {
    _id: string;
    coWorker: PopulatedCoWorker | null;
    business: PopulatedBusiness | null;
    seat: PopulatedSeat | null;
    startDate: Date;
    endDate?: Date;
    status: 'Active' | 'Completed' | 'Cancelled';
    isRenewed: boolean;
    timesRenewed: number;
    createdAt: Date;
}

export default async function BookingDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    await dbConnect();

    // We cast the lean result to our PopulatedBooking interface
    const booking = (await Booking.findById(id)
        .populate("coWorker")
        .populate("business")
        .populate("seat")
        .lean()) as unknown as PopulatedBooking;

    if (!booking) {
        notFound();
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Top Navigation & Title Section */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/dashboard/bookings"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors w-fit"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Bookings
                </Link>

                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-[#173e81]">Booking Details</h1>
                    <Badge className={`px-4 py-1 text-sm ${statusColors[booking.status]}`}>
                        {booking.status}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Member Information */}
                <Card className="shadow-sm border-t-4 border-t-blue-500">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <CardTitle>Member Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Full Name</span>
                            <span className="font-semibold text-lg">{booking.coWorker?.fullName || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Company / Business</span>
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{booking.business?.businessName || "Individual Member"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{booking.business?.businessLocation || "Unknown Location"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Space & Timeline */}
                <Card className="shadow-sm border-t-4 border-t-orange-500">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Armchair className="w-5 h-5 text-orange-600" />
                        <CardTitle>Space & Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">Assigned Seat</span>
                            <span className="font-mono font-bold text-blue-700">{booking.seat?.seatNumber || "Unassigned"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Start
                                </span>
                                <p className="text-sm font-semibold">{new Date(booking.startDate).toDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> Expiry
                                </span>
                                <p className="text-sm font-semibold text-red-600">
                                    {booking.endDate ? new Date(booking.endDate).toDateString() : "Permanent"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Renewal Info - Full Width */}
                <Card className="shadow-sm md:col-span-2 border-t-4 border-t-purple-500">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <RefreshCcw className="w-5 h-5 text-purple-600" />
                        <CardTitle>Renewal & Subscription History</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold">
                                    Renewal Status: {booking.isRenewed ? "Renewed" : "Not Renewed"}
                                </p>
                                {booking.isRenewed && <Badge variant="secondary" className="bg-purple-50 text-purple-700">Recurring</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                This booking has been successfully extended <span className="font-bold text-foreground">{booking.timesRenewed || "0"}</span> times.
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-xs text-muted-foreground uppercase">System Record</p>
                            <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{id}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <p className="text-center text-[10px] text-gray-400">
                Booking Record ID: {String(booking._id)} • Last Updated: {new Date(booking.createdAt).toLocaleString()}
            </p>
        </div>
    );
}