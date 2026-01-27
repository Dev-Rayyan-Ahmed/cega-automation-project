import Image from "next/image";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-5">
      <Image width={300} height={300} src={"/cegalogo.svg"} alt="logo" />
      <div>
        {/* Button div */}
        <button className="bg-[#173e81] text-white hover:text-[#2093b3] px-20 py-4 border-2 border-white rounded-2xl font-extrabold">
          Login
        </button>

        <button className="bg-[#173e81] text-white hover:text-[#2093b3] px-14 py-4 border-2 border-white rounded-2xl font-extrabold">
          DashBoard
        </button>
      </div>
    </div>
  );
}
