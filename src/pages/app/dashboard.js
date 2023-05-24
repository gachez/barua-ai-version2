"use client"
import React from "react";
import { db } from '@/firebase.config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getSignedInUserCookie } from "@/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BuyCreditsModal from "@/components/BuyCreditModal";
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))
const DashboardComponent = dynamic(() => import("@/components/Dashboard"))

export default function Dashboard() {
  const router = useRouter();
  const [docum, setDocum] = React.useState()
  const [showAlert, setShowAlert] = React.useState(false)
  const [signedInUser, setSignedInUser] = React.useState('')
  const [userOffers, setUserOffers] = React.useState([])
  const [userEmails, setUserEmails] = React.useState([])
  const [open, setOpen] = React.useState(false)

    async function getUser(){
      try {
      const q = query(collection(db, "users"), where("email", "==", getSignedInUserCookie()));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSignedInUser(doc.data())
        console.log(doc.data())
        typeof window !== "undefined" ? window.localStorage.setItem('user',JSON.stringify(doc.data())) : null
        setDocum(`${doc.id}`)
        typeof window !== "undefined" ? window.localStorage.setItem('userAccount', doc.data().accountNumber) : null
      });  
      } catch (error) {
        console.log(error)
          setShowAlert(true)
      }
    }

    async function getOffers(){
      try {
          let emailObjs = []
          let offersFound = []
          let emailRefsL = []
      const q = query(collection(db, "userOffers"), where("userEmail", "==", signedInUser?.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        offersFound.push(doc.data())
        emailRefsL.push(doc.id)
        emailObjs.push({
          id: doc.id,
          email: doc.data()
        })
      });
      console.log(offersFound)
      setUserOffers(offersFound)
      } catch (error) {
          console.error(error)
      }
    }

    async function getEmails(){
      const userEmail = signedInUser?.email
      try {
          let emailObjs = []
          let emailsFound = []
          let emailRefsL = []
      const q = query(collection(db, "userEmails"), where("userId", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        emailsFound.push(doc.data())
        emailRefsL.push(doc.id)
        emailObjs.push({
          id: doc.id,
          email: doc.data()
        })
      });
      console.log(emailsFound)
      setUserEmails(emailsFound)
      } catch (error) {
          console.error(error)

      }
    }


    React.useEffect(() => {
      getUser()
      getOffers()
      getEmails()
    }, [router])

    return(
        <>
        <NavBarTop signedInUser={signedInUser} setOpen={setOpen} mainComponent={<DashboardComponent />} />
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

