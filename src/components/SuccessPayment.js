'use client'
import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import axios from 'axios'
import { db } from '@/firebase.config'
import Config from '@/config'
import { getParameterByName, getSignedInUserCookie, returnOrderEmail } from '@/utils'
import { collection, query,updateDoc,doc, where, getDocs, getDoc } from "firebase/firestore";

export default function SuccessPayment() {
  const [open, setOpen] = useState(true)
  const [gottenOrder,setGottenOrder] = React.useState()
  const [docum,setDocum] = React.useState('')
  const [loading,setLoading] = React.useState(true)
  const [userDocumentRef,setUserDocumentRef] = React.useState('')
  const [pageHeadline,setPageHeadline] = React.useState('10 credits have been added to your account!')
  const [pageTitle,setPageTitle] = React.useState('🥂 Purchase completed')
  const cancelButtonRef = useRef(null)

  async function editOrder(documentRef){
   console.log('This is the order ', gottenOrder)
   const userRef = doc(db, "orders", documentRef);
   try {
       await updateDoc(userRef, {
       status: 'complete'
       }).then(() => {
         console.log('success')
         editUser(userDocumentRef,gottenOrder.credits)
       })
   } catch (error) {
       console.error(error)
       alert(error)
   }
 }
 async function getUser(){
   try {
   const q = query(collection(db, "users"), where("email", "==", getSignedInUserCookie()));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     window.localStorage.setItem('user',JSON.stringify(doc.data()))
     setUserDocumentRef(`${doc.id}`)
   });
      // Call getTransactionStatus function here after user data has been fetched
      getTransactionStatus();  
   } catch (error) {
     console.error(error)
     alert(error)
   }
 }

 async function editUser(documentRef,credits){
   const userRef = doc(db, "users", documentRef);
   const updates = {
           creditsAvailable: gottenOrder.type ==='subscription'?parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable) + parseInt(credits):parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable)+gottenOrder.credits,
           isSubscribed: gottenOrder.type ==='subscription'
       }
   try {
       await updateDoc(userRef, updates );
       if(gottenOrder.type ==='subscription'){
         setPageTitle('Subscription confirmed. Cancel anytime')
         setPageHeadline('Credits have been deposited to your account. Enjoy!')
       }
       sendEmail(gottenOrder.amount,gottenOrder.credits)
       setPageTitle('🥂 Purchase complete')
       setPageHeadline('Succesfully added '+credits+' credits to your account')
       setLoading(false)
   } catch (error) {
       console.error(error)
       alert(error)
   }
 }

  async function getOrder(){
    console.log('getOrder is called')
   const merchantID = localStorage.getItem('merchantID')
   try {
   let id
   let gottenOrders
   const q = query(collection(db, "orders"), where("merchantID", "==", merchantID));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     setDocum(`${doc.id}`)
     id = doc.id
     gottenOrders = doc.data()
   });
   setGottenOrder(gottenOrders)
   } catch (error) {
     alert(error)
   }
  }
  function sendEmail(amount,credits,){
   axios.post(`${Config.API_URI}/send-mail`,{
       to:getSignedInUserCookie(),
       bcc:"",
       subject:`Order complete 🎉!`,
       message:  returnOrderEmail(JSON.parse(localStorage.getItem('user')).name,amount,localStorage.getItem('userAccount'),credits,'Buy credits','complete')
   })
   .then(() => {
       console.log('email sent')
   })
   .catch(err => {
       alert(err)
   })
  }

  async function determineOrder(res){
   if(res.data.status === '200'){
     await getOrder()
     return
    }
    alert('We couldnt complete your payment')
  }
 
  function getTransactionStatus(){
   console.log('transaction status called') 
   const orderId = getParameterByName('OrderTrackingId')
   axios.get(`${Config.API_URI}/get-transaction-status?orderTrackingId=${orderId}`)
   .then(res => {
     determineOrder(res)
   })
   .catch(err => {
       alert(err)
   })
  }


  async function fetchOrderAndUpdate(){
    await getOrder(); 
    editOrder(docum);
  }
  
  React.useEffect(() => {
    getUser();
  },[])
  
  React.useEffect(() => {
    if(docum) {
      fetchOrderAndUpdate();
    }
  },[docum])
  
  
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {
                loading
                ?
                <div>Loading...</div>
                :
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {pageTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {pageHeadline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href={"/app/dashboard"}
                  >
                    Go back
                  </Link>
                </div>
              </Dialog.Panel>
              }
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}