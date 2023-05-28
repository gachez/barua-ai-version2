"use client"
import React from "react";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";
const CrispWithNoSSR = dynamic(
  () => import('../components/CrispChat'),
  { ssr: false }
)
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"),{ssr:false})
const EmailList = dynamic(()=>import("@/components/EmailList"),{ssr:false})
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"), {ssr: false})

export default function Emails() {
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    return(
        <>
            {
                isLoading
                ?
                <LinearProgress />
                :
                null
            }
            <div style={{opacity: isLoading ? 0.7 : 1}} >
                <NavBarTop setNavLoading={setIsLoading} navLoading={isLoading} mainComponent={<EmailList />} setOpen={setOpen} />
                {
                open
                ?
                <BuyCreditsModal setOpen={setOpen} open={open} />
                :
                null
                }
            </div>
            <CrispWithNoSSR />
        </>
    )
}

