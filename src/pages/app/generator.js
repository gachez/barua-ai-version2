"use client"
import React from "react";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp'),
  { ssr: false }
)
const NavBarTop = dynamic(() => import("@/components/NavBarTop"), {ssr: false})
const FormLayout = dynamic(() => import("@/components/FormLayout"), {ssr: false})
const BuyCreditsModal = dynamic(() => import("@/components/BuyCreditModal"), {ssr: false})
const Footer = dynamic(() => import("@/components/Footer"), {ssr: false})

export default function Generator() {
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
                <NavBarTop setNavLoading={setIsLoading} navLoading={isLoading} setOpen={setOpen} mainComponent={<FormLayout />} />
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