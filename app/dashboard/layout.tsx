import BackgroundBlur from "@/components/blur-background";
import SideBar from "@/components/side-bar";

export default function DashBoardLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <main className="flex w-full p-0 md:p-2 h-screen overflow-hidden">
                  <BackgroundBlur />
                  <SideBar />

                  <div className=" conatiner w-full md:w-5/6 p-4 bg-white rounded-none md:rounded-r-3xl">
                        {children}
                  </div>
            </main>
      );
}
