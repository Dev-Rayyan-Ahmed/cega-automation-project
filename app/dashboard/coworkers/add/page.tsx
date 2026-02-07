import React from "react";
import CoWorkerForm from "@/components/forms/coWorkerForm";
import { getBusiness } from "@/actions/business";
import { getSeats } from "@/actions/seats";


export default async function Resident() {
      const [busRes, seatRes] = await Promise.all([getBusiness(), getSeats()]);
      const businessSelectItem = busRes.data.map(b => ({ _id: String(b._id), selectItemName: b.businessName }))
      const seatsSelectItem = seatRes.data.map(s => ({ _id: String(s._id), selectItemName: s.seatNumber }))
      return (
            <div>
                  <CoWorkerForm businesses={businessSelectItem} seats={seatsSelectItem} />
            </div>
      )
}