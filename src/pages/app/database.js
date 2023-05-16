
import dynamic from "next/dynamic";
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"),{ssr:false})
const ProspectList = dynamic(()=>import("@/components/ProspectList"),{ssr:false})

export default function Database() {
    return(
        <>
            <NavBarTop />
            <main className="flex-col">
                <div className="mx-auto max-w-7xl h-screen py-6 sm:px-6 lg:px-8">
                    <ProspectList />
                </div>
            </main>
        </>
    )
}

