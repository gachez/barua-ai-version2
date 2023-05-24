"use client"
import React from "react";
import dynamic from "next/dynamic";

const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))
const OfferList = dynamic(()=>import("@/components/OfferList"))
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"))

export default function Offers() {
    const [open, setOpen] = React.useState(false)
    return(
        <>
            <NavBarTop mainComponent={<OfferList />} setOpen={setOpen} />
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

