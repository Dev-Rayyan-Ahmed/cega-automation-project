import dbConnect from "@/lib/db";
import Booking from "@/models/booking.model";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
    // Security check: Ensure the request comes from your Cron provider
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        await dbConnect();

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);


        const expiringBookings = await Booking.find({
            endDate: { $gte: startOfMonth, $lte: endOfMonth }
        }).populate("coWorker", "fullName email");

        // Send emails in parallel
        const emailPromises = expiringBookings.map(async (booking: any) => {
            if (!booking.coWorker?.email) return;

            return resend.emails.send({
                from: 'CEGA Management <notifications@yourdomain.com>',
                to: booking.coWorker.email,
                subject: 'Workspace Booking Ending Soon',
                html: `<p>Hi ${booking.coWorker.fullName}, your booking is scheduled to end on ${new Date(booking.endDate).toDateString()}. Please contact the admin if you wish to renew.</p>`
            });
        });

        await Promise.all(emailPromises);

        return Response.json({ success: true, count: expiringBookings.length });
    } catch (error) {
        return Response.json({ success: false, error: "Cron failed" }, { status: 500 });
    }
}