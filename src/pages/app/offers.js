"use client"
import React from "react";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp'),
  { ssr: false }
)
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))
const OfferList = dynamic(()=>import("@/components/OfferList"))
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"))

export default function Offers() {
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
                <NavBarTop setNavLoading={setIsLoading} navLoading={isLoading} mainComponent={<OfferList />} setOpen={setOpen} />
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

