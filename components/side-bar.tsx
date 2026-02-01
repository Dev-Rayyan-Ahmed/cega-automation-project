import { Eye, HomeIcon, UserPenIcon, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";





export default function SideBar() {

      return (
            <div className={`hidden md:block md:w-1/6 bg-[#2093b3] p-4 rounded-none md:rounded-l-2xl`}>
                  <div className="flex flex-col gap-5">

                        <Image alt="logo" src={"/cegalogo.svg"} width={150} height={150} />

                        <ul className="mt-16 font-bold flex flex-col gap-4">
                              <Link href={"/dashboard"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <HomeIcon className="" />
                                          <span> Home</span>

                                    </li>
                              </Link>

                              <Link href={"/dashboard/add-resident"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <UserPenIcon className="" />
                                          <span> Add Resident</span>
                                    </li>
                              </Link>


                              <Link href={"/dashboard/view-resident"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <Eye className="" />
                                          <span> View Resident</span>
                                    </li>
                              </Link>

                        </ul>
                  </div>
            </div>
      )
}