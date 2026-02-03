"use client";
import { useState } from "react";
import { TextInputField } from "@/components/inputFields/inputFields";

export default function CoWorkerForm() {
      const [formData, setFormData] = useState({
            // Personal Information
            fullName: "", dateOfBirth: "", gender: "", nationality: "",
            phone: "", cnic: "", email: "", address: "",
            lockerNo: "", dateOfJoining: "",
            emergencyName: "", emergencyPhone: "", relationship: "",

      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            console.log("Form Data Submitted:", formData);
      };

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
                                    <TextInputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required/>

                                    <div>
                                          <label className="block mb-1 font-medium">Gender</label>
                                          <select name="gender" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20" required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                          </select>
                                    </div>

                                    <TextInputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} required/>
                                    <TextInputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                    <TextInputField label="CNIC" name="cnic" value={formData.cnic} onChange={handleChange} required />
                                    <TextInputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <TextInputField label="Residential Address" name="address" value={formData.address} onChange={handleChange} required/>
                                    <TextInputField label="Issued Locker No." name="lockerNo" value={formData.lockerNo} onChange={handleChange} required/>
                                    <TextInputField label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} required/>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <TextInputField label="Emergency Contact Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} required/>
                                    <TextInputField label="Emergency Phone No" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required/>
                                    <TextInputField label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} required/>
                              </div>
                        </section>

                        {/* SECTION 2: BUSINESS/STARTUP INFORMATION */}

                        <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-900/30 transition-all">
                              Submit Registration
                        </button>
                  </form>
            </div>
      );
}

