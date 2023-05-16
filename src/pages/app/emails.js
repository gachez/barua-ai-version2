
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"),{ssr:false})
const EmailList = dynamic(()=>import("@/components/EmailList"),{ssr:false})

export default function Emails() {
    return(
        <>
            <NavBarTop />
            <main className="flex-col">
            <div className="mx-auto max-w-7xl h-screen py-6 sm:px-6 lg:px-8">
            {/* Your content */}
                {/* Secondary navigation */}

                {/* Stats */}
                <EmailList />
                </div>
            </main>
        </>
    )
}

