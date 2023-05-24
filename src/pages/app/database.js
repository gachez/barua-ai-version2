"use client"
import React from "react";
import dynamic from "next/dynamic";
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"),{ssr:false})
const ProspectList = dynamic(()=>import("@/components/ProspectList"),{ssr:false})
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"), {ssr: false})

export default function Database() {
    const [open, setOpen] = React.useState(false)
    return(
        <>
            <NavBarTop mainComponent={<ProspectList />} setOpen={setOpen} />
            {
            open
            ?
            <BuyCreditsModal setOpen={setOpen} open={open} />
            :
            null
            }
        </>
    )
}

