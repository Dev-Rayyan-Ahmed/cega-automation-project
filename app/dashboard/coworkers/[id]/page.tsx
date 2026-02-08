import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import CoWorker from "@/models/coworker.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Phone,
    Mail,
    CreditCard,
    MapPin,
    Briefcase,
    Calendar,
    Lock,
    ShieldAlert,
    ChevronLeft,
    Globe,
    UserCircle
} from "lucide-react";

// Registering models for populate
import "@/models/business.model";


interface PopulatedBusiness {
    _id: string;
    businessName: string;
    businessLocation: string;
}

interface ICoWorkerDetail {
    _id: string;
    fullName: string;
    dateOfBirth: Date;
    gender: string;
    nationality: string;
    phone: string;
    cnic: string;
    email: string;
    address: string;
    business: PopulatedBusiness | null;
    lockerNo: string;
    dateOfJoining: Date;
    emergencyContactName: string;
    emergencyPhoneNo: string;
    relationship: string;
    createdAt: Date;
}

export default async function CoworkerDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    await dbConnect();

    // Fetch and populate business reference
    const worker = (await CoWorker.findById(id)
        .populate("business", "businessName businessLocation")
        .lean()) as unknown as ICoWorkerDetail;

    if (!worker) {
        notFound();
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-6 max-h-[93vh] overflow-y-auto custom-scrollbar">
            {/* back button */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/dashboard/coworkers"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors w-fit"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Coworkers
                </Link>

                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Coworker Profile</h1>
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        Member since {new Date(worker.dateOfJoining).getFullYear()}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* card of personal detail */}
                <Card className="md:col-span-1 shadow-sm border-t-4 border-t-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <User className="w-12 h-12" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{worker.fullName}</h2>
                                <p className="text-sm text-muted-foreground">{worker.email}</p>
                            </div>
                            <div className="w-full pt-4 border-t space-y-3 text-left">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>{worker.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                    <span>CNIC: {worker.cnic}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <span>{worker.nationality}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* section for professional  details */}
                <Card className="md:col-span-2 shadow-sm border-t-4 border-t-orange-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-orange-600" />
                            Workspace Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">Affiliated Business</p>
                                <p className="font-semibold">{worker.business?.businessName || "Individual Member"}</p>
                                <p className="text-xs text-gray-500">{worker.business?.businessLocation}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locker Number
                                </p>
                                <p className="font-mono text-lg font-bold text-blue-600">{worker.lockerNo || "No Locker"}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> Joining Date
                                </p>
                                <p className="font-semibold">{new Date(worker.dateOfJoining).toDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">Gender / Identity</p>
                                <p className="font-semibold">{worker.gender}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 pt-4 border-t">
                            <p className="text-xs text-muted-foreground uppercase flex items-center gap-1 mb-1">
                                <MapPin className="w-3 h-3" /> Home Address
                            </p>
                            <p className="text-sm">{worker.address}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* emergency full details */}
                <Card className="md:col-span-3 shadow-sm border-l-4 border-l-red-500 bg-red-50/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-700">
                            <ShieldAlert className="w-5 h-5" />
                            Emergency Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Contact Name</p>
                            <p className="text-lg font-bold">{worker.emergencyContactName}</p>
                            <Badge variant="outline" className="capitalize">{worker.relationship}</Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Emergency Phone</p>
                            <div className="flex items-center gap-2 text-xl font-bold text-red-600">
                                <Phone className="w-5 h-5" />
                                {worker.emergencyPhoneNo}
                            </div>
                        </div>
                        <div className="hidden md:block opacity-10">
                            <UserCircle className="w-20 h-20" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <p className="text-center text-[10px] text-gray-400">
                Worker Record ID: {String(worker._id)} • Last Updated: {new Date(worker.createdAt).toLocaleString()}
            </p>
        </div>
    );
}