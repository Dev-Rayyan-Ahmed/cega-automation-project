import { BookUser, Briefcase, HomeIcon, UserPenIcon, View } from "lucide-react";
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
                                    <li className="bg-white flex justify-between px-8 items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <HomeIcon className="" />
                                          <span className="px-4"> Home</span>

                                    </li>
                              </Link>

                              <Link href={"/dashboard/businesses"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <Briefcase className="" />
                                          <span className="px-3">Business</span>

                                    </li>
                              </Link>

                              <Link href={"/dashboard/coworkers"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <UserPenIcon className="" />
                                          <span> Co-Workers </span>
                                    </li>
                              </Link>


                              <Link href={"/dashboard/bookings"}>
                                    <li className="bg-white flex justify-center items-center gap-2 rounded-full min-h-10 text-[#173e81] hover:bg-[#173e81] hover:text-white hover:cursor-pointer">
                                          <BookUser className="" />
                                          <span className="px-3">Bookings</span>
                                    </li>
                              </Link>

                        </ul>
                  </div>
            </div>
      )
}