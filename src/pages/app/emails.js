"use client"
import React from "react";
import dynamic from "next/dynamic";
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"),{ssr:false})
const EmailList = dynamic(()=>import("@/components/EmailList"),{ssr:false})
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"), {ssr: false})

export default function Emails() {
    const [open, setOpen] = React.useState(false)
    return(
        <>
            <NavBarTop mainComponent={<EmailList />} setOpen={setOpen} />
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

