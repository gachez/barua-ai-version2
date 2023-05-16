import dynamic from "next/dynamic";

const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))
const Footer = dynamic(()=>import("@/components/Footer"))
const TemplateList = dynamic(()=>import("@/components/TemplateList"))

export default function Offers() {
    return(
        <>
            <NavBarTop />
            <main>
            <div className="mx-auto max-w-7xl h-screen py-6 sm:px-6 lg:px-8">
            {/* Your content */}
                <TemplateList />
                </div>
                <Footer />
            </main>
        </>
    )
}

