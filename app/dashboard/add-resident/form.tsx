"use client";
import { useState } from "react";

export default function BasicForm() {
      const [formData, setFormData] = useState({
            // Personal Information
            fullName: "", dateOfBirth: "", gender: "", nationality: "",
            phone: "", cnic: "", email: "", address: "",
            lockerNo: "", dateOfJoining: "",
            emergencyName: "", emergencyPhone: "", relationship: "",
            // Business Information
            businessName: "", businessStage: "", industry: "",
            description: "", problemSolved: "", assets: "", teamMembers: [""]
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleTeamMemberChange = (index: number, value: string) => {
            const updatedMembers = [...formData.teamMembers];
            updatedMembers[index] = value;
            setFormData({ ...formData, teamMembers: updatedMembers });
      };

      const addMemberField = () => {
            setFormData({
                  ...formData,
                  teamMembers: [...formData.teamMembers, ""]
            });
      };

      const removeMemberField = (index: number) => {
            const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
            setFormData({ ...formData, teamMembers: updatedMembers });
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
                                    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />

                                    <div>
                                          <label className="block mb-1 font-medium">Gender</label>
                                          <select name="gender" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                          </select>
                                    </div>

                                    <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                                    <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                    <InputField label="CNIC" name="cnic" value={formData.cnic} onChange={handleChange} required />
                                    <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <InputField label="Residential Address" name="address" value={formData.address} onChange={handleChange} />
                                    <InputField label="Issued Locker No." name="lockerNo" value={formData.lockerNo} onChange={handleChange} />
                                    <InputField label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <InputField label="Emergency Contact Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} />
                                    <InputField label="Emergency Phone" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} />
                                    <InputField label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} />
                              </div>
                        </section>

                        {/* SECTION 2: BUSINESS/STARTUP INFORMATION */}
                        <section>
                              <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">
                                    2. Business/Startup Information
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Business/Startup Name" name="businessName" value={formData.businessName} onChange={handleChange} />
                                    <div>
                                          <label className="block mb-1 font-medium">Business Stage</label>
                                          <select name="businessStage" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20">
                                                <option value="">Select Stage</option>
                                                <option value="Idea">Idea</option>
                                                <option value="Early Stage">Early Stage</option>
                                                <option value="Prototype">Prototype</option>
                                                <option value="Revenue-generating">Revenue-generating</option>
                                          </select>
                                    </div>
                                    <InputField label="Industry/Sector" name="industry" value={formData.industry} onChange={handleChange} />
                                    <section className="space-y-1">
                                          <label className="block font-medium text-gray-700">Current Team Members (if any) </label>

                                          {formData.teamMembers.map((member, index) => (
                                                <div key={index} className="flex gap-8 mb-2">
                                                      <input
                                                            type="text"
                                                            placeholder={`Member ${index + 1} Name`}
                                                            value={member}
                                                            onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                                                            className="flex-1 border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all"
                                                      />
                                                      {formData.teamMembers.length > 1 && (
                                                            <button
                                                                  type="button"
                                                                  onClick={() => removeMemberField(index)}
                                                                  className="text-red-500 px-2 hover:bg-red-50 rounded"
                                                            >
                                                                  ✕
                                                            </button>
                                                      )}
                                                </div>
                                          ))}

                                          <button
                                                type="button"
                                                onClick={addMemberField}
                                                className="text-sm text-blue-900 font-semibold hover:underline flex items-center gap-1"
                                          >
                                                + Add Another Member
                                          </button>
                                    </section>
                              </div>

                              <div className="space-y-4 mt-4">
                                    <TextAreaField label="Business Description (Brief)" name="description" value={formData.description} onChange={handleChange} />
                                    <TextAreaField label="Problem Your Startup Solves" name="problemSolved" value={formData.problemSolved} onChange={handleChange} />
                                    <TextAreaField label="Assets" name="assets" value={formData.assets} onChange={handleChange} />
                              </div>
                        </section>

                        <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-900/30 transition-all">
                              Submit Registration
                        </button>
                  </form>
            </div>
      );
}
// 1. Define the shape of your props otherwise it will give error, bcz of tsx
interface InputProps {
      label: string;
      name: string;
      type?: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
      required?: boolean;
}

// Reusable Components to keep it clean
const InputField = ({ label, name, type = "text", value, onChange, required = false }: InputProps) => (
      <div>
            <label className="block mb-1 font-medium text-gray-600">{label}</label>
            <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all"
                  required={required}
            />
      </div>
);

const TextAreaField = ({ label, name, value, onChange }: InputProps) => (
      <div>
            <label className="block mb-1 font-medium text-gray-600">{label}</label>
            <textarea
                  name={name}
                  value={value}
                  onChange={onChange}
                  rows={3}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all resize-none"
            />
      </div>
);