"use client"
import React from "react";
import dynamic from "next/dynamic";
const NavBarTop = dynamic(() => import("@/components/NavBarTop"), {ssr: false})
const FormLayout = dynamic(() => import("@/components/FormLayout"), {ssr: false})
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"), {ssr: false})
const Footer = dynamic(() => import("@/components/Footer"), {ssr: false})

export default function Generator() {
    const [open, setOpen] = React.useState(false)
    return(
        <>
            <NavBarTop setOpen={setOpen} mainComponent={<FormLayout />} />
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