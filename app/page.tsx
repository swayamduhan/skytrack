import Navbar from "@/components/Navbar";
import HeroComponent from "@/components/HeroComponent";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./lib/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "./provider";
import { JotaiProvider } from "./JotaiProvider";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if(session){
    redirect('/track')
  }

  return (
    <div className="min-h-screen max-w-screen relative dark:bg-[var(--background-dark)] dark:text-[var(--foreground-dark)]">
      <JotaiProvider><AuthProvider>
        <Navbar />
      </AuthProvider></JotaiProvider>
      <div
        className="bg-[radial-gradient(ellipse,rgba(124,124,124,0.623)_20%,#b3b2b2a7_40%,#efefef_80%)] dark:bg-[radial-gradient(ellipse,rgba(131,170,186,0.438)_20%,#7996c661_40%,rgb(0,0,0)_80%)]"
        style={{
          inset: 0,
          position: "absolute",
          WebkitMaskImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          WebkitMaskSize: "6rem 6rem",
          WebkitMaskRepeat: "repeat",
          maskImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          maskSize: "4rem 4rem",
          maskRepeat: "repeat",
          pointerEvents: "none",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <HeroComponent />
      </div>
      <Footer />
    </div>
  );
}
