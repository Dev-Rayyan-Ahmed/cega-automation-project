import SideBar from "@/components/side-bar";

export default function DashBoardLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <main className="flex p-0 md:p-2 h-screen overflow-hidden">
                  <SideBar />

                  <div className="md:w-5/6 p-4 bg-white rounded-none md:rounded-r-3xl">
                        {children}
                  </div>
            </main>
      );
}
