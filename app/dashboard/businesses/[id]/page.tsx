import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Business from "@/models/business.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Briefcase,
    MapPin,
    Target,
    Layers,
    Users,
    ChevronLeft,
    Lightbulb,
    FileText,
    ExternalLink
} from "lucide-react";

// Registering Coworker model so the array can be populated
import "@/models/coworker.model";


interface PopulatedWorker {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
}

interface IBusinessDetail {
    _id: string;
    businessName: string;
    businessStage: 'Idea' | 'Early Stage' | 'ProtoType' | 'Revenue Generating';
    businessLocation: 'Lahore' | 'Karachi';
    description: string;
    problemSolved: string;
    assets: string;
    coWorkers: PopulatedWorker[];
    createdAt: Date;
    updatedAt: Date;
}

export default async function BusinessDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    await dbConnect();

    const business = (await Business.findById(id)
        .populate("coWorkers", "fullName email phone")
        .lean()) as unknown as IBusinessDetail;

    if (!business) {
        notFound();
    }

    const stageColors: Record<string, string> = {
        'Idea': "bg-yellow-100 text-yellow-800 border-yellow-200",
        'Early Stage': "bg-blue-100 text-blue-800 border-blue-200",
        'ProtoType': "bg-purple-100 text-purple-800 border-purple-200",
        'Revenue Generating': "bg-green-100 text-green-800 border-green-200",
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-6 max-h-[93vh] overflow-y-auto custom-scrollbar">
            {/* Top Header */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/dashboard/businesses"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors w-fit"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Businesses
                </Link>

                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">{business.businessName}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>CEGA {business.businessLocation} Branch</span>
                        </div>
                    </div>
                    <Badge className={`px-4 py-1 text-sm ${stageColors[business.businessStage]}`}>
                        {business.businessStage}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/*  overview of Business */}
                <Card className="md:col-span-2 shadow-sm border-t-4 border-t-blue-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                            <Target className="w-5 h-5" />
                            Business Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4" /> Description
                            </h3>
                            <p className="text-slate-700 leading-relaxed">{business.description}</p>
                        </div>
                        <div className="pt-4 border-t">
                            <h3 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4" /> Problem Being Solved
                            </h3>
                            <p className="text-slate-700 leading-relaxed">{business.problemSolved}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* details of assets */}
                <Card className="md:col-span-1 shadow-sm border-t-4 border-t-orange-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                            <Layers className="w-5 h-5" />
                            Assets & Resources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-orange-50/50 p-4 rounded-lg border border-orange-100">
                            <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {business.assets || "No assets listed for this business."}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Team / Coworkers List */}
                <Card className="md:col-span-3 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Registered Team Members
                        </CardTitle>
                        <Badge variant="secondary">{business.coWorkers.length} Active</Badge>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {business.coWorkers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {business.coWorkers.map((worker) => (
                                    <div key={worker._id} className="group p-4 border rounded-xl hover:border-indigo-300 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {worker.fullName}
                                            </p>
                                            <Link href={`/dashboard/coworkers/${worker._id}`}>
                                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-indigo-500" />
                                            </Link>
                                        </div>
                                        <div className="text-xs text-muted-foreground space-y-1">
                                            <p>{worker.email}</p>
                                            <p>{worker.phone}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>No team members are currently associated with this business.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <p className="text-center text-[10px] text-gray-400">
                Business Record ID: {String(business._id)} • Last Updated: {new Date(business.createdAt).toLocaleString()}
            </p>
        </div>
    );
}