import dynamic from "next/dynamic";

const NavBarTop = dynamic(() => import("@/components/NavBarTop"), {ssr: false})
const FormLayout = dynamic(() => import("@/components/FormLayout"), {ssr: false})

const Footer = dynamic(() => import("@/components/Footer"), {ssr: false})

export default function Dashboard() {
    return(
        <>
            <NavBarTop />
            <main className="flex-col">
            <div className="mx-auto max-w-7xl py-0 sm:px-6 lg:px-8 bg-rgb(17 24 39 / var(1))">
                {/* Your content */}
                <FormLayout />
            </div>
            <Footer />
            </main>
        </>
    )
}