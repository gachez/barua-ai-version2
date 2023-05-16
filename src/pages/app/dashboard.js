import React from "react";
import Stats from "@/components/Stats";
import { useRouter } from 'next/router';
import Footer from "@/components/Footer";
import { doc, updateDoc,addDoc } from "firebase/firestore";
import { db } from '@/firebase.config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getSignedInUserCookie } from "@/utils";
import dynamic from "next/dynamic";
const MenuGrid = dynamic(()=>import("@/components/MenuGrid"))
const NavBarTop = dynamic(()=>import("@/components/NavBarTop"))

export default function Dashboard() {
  const [docum, setDocum] = React.useState()
  const [showAlert, setShowAlert] = React.useState(false)
  const [signedInUser, setSignedInUser] = React.useState('')

    async function getUser(){
      try {
      const q = query(collection(db, "users"), where("email", "==", getSignedInUserCookie()));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSignedInUser(doc.data())
        window.localStorage.setItem('user',JSON.stringify(doc.data()))
        setDocum(`${doc.id}`)
        window.localStorage.setItem('userAccount', doc.data().accountNumber)
      });  
      } catch (error) {
        console.log(error)
          setShowAlert(true)
      }
    }

    React.useEffect(() => {
      getUser()
    }, [])

    return(
        <>
            <NavBarTop signedInUser={signedInUser}  />
            <main className="h-full flex-col">
            <div className="mx-auto max-w-7xl h-screen py-6 sm:px-6 lg:px-8">
            {/* Your content */}
                {/* Secondary navigation */}

                {/* Stats */}
                <Stats /><br />
                <MenuGrid />
                </div>
                <Footer />
            </main>
        </>
    )
}

