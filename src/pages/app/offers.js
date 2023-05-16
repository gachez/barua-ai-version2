import dynamic from "next/dynamic";


const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))
const Footer = dynamic(()=>import("@/components/Footer"))
const OfferList = dynamic(()=>import("@/components/OfferList"))

export default function Offers() {
    return(
        <>
            <NavBarTop />
            <main className="flex-col">
            <div className="mx-auto max-w-7xl h-screen py-6 sm:px-6 lg:px-8">
            {/* Your content */}
                <OfferList />
                </div>
                <Footer />
            </main>
        </>
    )
}

