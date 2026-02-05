"use client";
import { useState } from "react";
import { TextInputField } from "@/components/inputFields/inputFields";
import SearchableSelect from "../inputFields/businessSearchSelect";
import { addCoworker } from "@/actions/coworker";
import toast, { Toaster } from "react-hot-toast";

type coWorkerFormProps = {
      businesses: { _id: string; selectItemName: string }[];
      seats: { _id: string; selectItemName: string }[];
}
export interface coWorkerFormData {
      fullName: string;
      dateOfBirth: string;
      gender: string;
      nationality: string;
      phone: string;
      cnic: string;
      email: string;
      address: string;
      lockerNo: string;
      dateOfJoining: string;
      emergencyContactName: string;
      emergencyPhoneNo: string;
      relationship: string;
      business: string,
      seat: string
}
export default function CoWorkerForm({ businesses, seats }: coWorkerFormProps) {
      const [formData, setFormData] = useState<coWorkerFormData>({
            // Personal Information
            fullName: "", dateOfBirth: "", gender: "", nationality: "",
            phone: "", cnic: "", email: "", address: "",
            lockerNo: "", dateOfJoining: "",
            emergencyContactName: "", emergencyPhoneNo: "", relationship: "",
            business: "",
            seat: ""
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const { success, error, message } = await addCoworker(formData);
            if (success) {
                  toast.success(message!)
            }
            else
                  toast.error(message!);
      };
      const handelBusinessSelect = (businessId: string) => {
            setFormData((prev) => ({ ...prev, business: businessId }))
      }
      const handelSeatSelect = (seatId: string) => {
            setFormData((prev) => ({ ...prev, seat: seatId }))
      }

      return (
            <div className=" p-8 max-h-[95vh] overflow-y-auto custom-scrollbar">
                  <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 uppercase ">
                        CO-Workers Registration Form
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">

                        {/* SECTION 1: PERSONAL INFORMATION */}
                        <section>
                              <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">
                                    1. Personal Information
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextInputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <TextInputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />

                                    <div>
                                          <label className="block mb-1 font-medium">Gender</label>
                                          <select name="gender" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20" required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                          </select>
                                    </div>

                                    <TextInputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
                                    <TextInputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                    <TextInputField label="CNIC" name="cnic" value={formData.cnic} onChange={handleChange} required />
                                    <TextInputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <TextInputField label="Residential Address" name="address" value={formData.address} onChange={handleChange} required />
                                    <TextInputField label="Issued Locker No." name="lockerNo" value={formData.lockerNo} onChange={handleChange} required />
                                    <TextInputField label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} required />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <TextInputField label="Emergency Contact Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
                                    <TextInputField label="Emergency Phone No" name="emergencyPhoneNo" value={formData.emergencyPhoneNo} onChange={handleChange} required />
                                    <TextInputField label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} required />
                              </div>
                        </section>

                        {/* Attached Seats */}
                        <SearchableSelect name="seats" selectItems={seats} onSelect={handelSeatSelect} />

                        {/* SECTION: BUSINESS/STARTUP INFORMATION */}
                        <SearchableSelect name="Business" selectItems={businesses} onSelect={handelBusinessSelect} />

                        <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-900/30 transition-all">
                              Submit Registration
                        </button>
                  </form>
                  <Toaster />
            </div>
      );
}

