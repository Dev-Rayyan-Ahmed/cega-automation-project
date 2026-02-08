import BusinessTable from "@/components/homeTable/homeTable";
import { ArmchairIcon } from "@/components/icons/tabler-armchair";
import { ArmchairOffIcon } from "@/components/icons/tabler-armchair-off";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Overview of all registered businesses</p>
        </div>
        <Link
          href="/dashboard/add-business"
          className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
        >
          + Register Business
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <div className="flex items-center justify-between bg-white border border-gray-200 
                  rounded-xl p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Seats Free</p>
              <p className="text-2xl font-semibold text-gray-900">30</p>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
              <ArmchairIcon size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border border-gray-200 
                  rounded-xl p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Seats Filled</p>
              <p className="text-2xl font-semibold text-gray-900">20</p>
            </div>
            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
              <ArmchairOffIcon size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border border-gray-200 
                  rounded-xl p-5 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Seats Going To Empty (This Month)</p>
              <p className="text-2xl font-semibold text-gray-900">20</p>
            </div>
            <div className="bg-green-50 text-green-600 p-3 rounded-lg">
              <MailCheck size={20} />
            </div>
          </div>

        </div>
      </div>


    </main>
  );
}