import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-8">
      <Image width={300} height={300} src={"/cegalogo.svg"} alt="logo" />
      <div>
        {/* Button div */}
        <button className="bg-[#173e81] text-white hover:text-[#2093b3] px-20 py-4 border-2 border-white rounded-2xl font-extrabold hidden">
          Login
        </button>

        <Link href={"/dashboard"}>
          <button className="bg-[#173e81] text-white hover:text-[#2093b3] px-24 py-4 border-2 border-white rounded-2xl font-extrabold">
            DashBoard
          </button>
        </Link>
      </div>
    </div>
  );
}
