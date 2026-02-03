"use client"
import { useState } from "react"
import { TextAreaField, TextInputField } from "../inputFields/inputFields";
import { useRouter } from "next/navigation";
import addBusiness from "@/actions/add-business";
import toast, { Toaster } from "react-hot-toast";

export interface BusinessFormData {
      businessName: string;
      industry: string;
      businessStage: string;
      businessLocation: string;
      description: string;
      problemSolved: string;
      assets: string;
}

export default function BusinessForm() {
      const router = useRouter(); // Initialize router

      const [businessFormData, setBusinessFormData] = useState<BusinessFormData>({

            // Business Information
            businessName: "", industry: "", businessStage: "", businessLocation: "",
            description: "", problemSolved: "", assets: "",
      });


      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setBusinessFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const { success, error, message } = await addBusiness(businessFormData);
            if (success) {
                  toast.success(message!)
            }
            else
                  toast.error(error!);

      };

      return (

            <div className=" p-8 max-h-[95vh] overflow-y-auto custom-scrollbar">
                  <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 uppercase ">
                        Business Registration Form
                  </h2>
                  <form onSubmit={handleSubmit}>

                        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">
                              Business/Startup Information
                        </h3>
                        <section>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextInputField label="Business/Startup Name" name="businessName" value={businessFormData.businessName} onChange={handleChange} required />
                                    <div>
                                          <label className="block mb-1.5 font-medium">Business Stage</label>
                                          <select name="businessStage" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20" required>
                                                <option value="">Select Stage</option>
                                                <option value="Idea">Idea</option>
                                                <option value="Early Stage">Early Stage</option>
                                                <option value="Prototype">Prototype</option>
                                                <option value="Revenue-generating">Revenue-generating</option>
                                          </select>
                                    </div>

                              </div>
                              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <TextInputField label="Industry/Sector" name="industry" value={businessFormData.industry} onChange={handleChange} required />
                                    <div>
                                          <label className="block mb-1.5 font-medium">Business Location</label>
                                          <select name="businessLocation" onChange={handleChange} className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20" required>
                                                <option value="">Select Location</option>
                                                <option value="Karachi">Karachi</option>
                                                <option value="Lahore">Lahore</option>
                                          </select>
                                    </div>
                              </div>
                              <div className="space-y-4 mt-4">
                                    <TextAreaField label="Business Description (Brief)" name="description" value={businessFormData.description} onChange={handleChange} required />
                                    <TextAreaField label="Problem Your Startup Solves" name="problemSolved" value={businessFormData.problemSolved} onChange={handleChange} required />
                                    <TextAreaField label="Assets" name="assets" value={businessFormData.assets} onChange={handleChange} required />
                              </div>
                              <button type="submit" className="w-full mt-4 bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-900/30 transition-all">
                                    Submit Registration
                              </button>
                        </section>

                  </form>

                  <Toaster />
            </div>
      );
}
interface InputProps {
      label: string;
      name: string;
      type?: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
      required?: boolean;
}

