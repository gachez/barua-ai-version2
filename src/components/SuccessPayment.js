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
  const [pageHeadline,setPageHeadline] = React.useState('10 credits have been added to your account!')
  const [pageTitle,setPageTitle] = React.useState('🥂 Purchase completed')
  const cancelButtonRef = useRef(null)

 async function getUser(){
   try {
   const q = query(collection(db, "users"), where("email", "==", getSignedInUserCookie()));
   const querySnapshot = await getDocs(q);
   let userReference
   querySnapshot.forEach((doc) => {
     window.localStorage.setItem('user',JSON.stringify(doc.data()))
     userReference = doc.id
   });
      // Call getTransactionStatus function here after user data has been fetched
      determinePayment(userReference)
   } catch (error) {
     console.error(error)
     alert(error)
   }
 }

  React.useEffect(() => {
    getUser();
  },[])
  
  async function determinePayment(userDocumentRef){
    try {
      const userRef = doc(db, "users", userDocumentRef);
      const type = getParameterByName('type')
      const variant = getParameterByName('variant')
      let updates
  
      if (type === 'onetime' && variant === 'starter'){
        updates = {
          creditsAvailable: parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable) + 100
        }
      }
      if (type === 'onetime' && variant === 'growth'){
        updates = {
          creditsAvailable: parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable) + 500
        }
      }
      if (type === 'onetime' && variant === 'pro'){
        updates = {
          creditsAvailable: parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable) + 1000
        }
      }
      if (type === 'subscription'){
        updates = {
          creditsAvailable: parseInt(JSON.parse(localStorage.getItem('user'))?.creditsAvailable) + 500,
          isSubscribed: true
        }
      }
  
      await updateDoc(userRef, updates );
      if(type ==='subscription'){
        setPageTitle('Subscription confirmed. Cancel anytime')
        setPageHeadline('Credits have been deposited to your account. Enjoy!')
      }
      setPageTitle('🥂 Purchase complete')
      setPageHeadline('Succesfully added credits to your account')
      setLoading(false)
  
    } catch (error) {
      console.log(error)
    }    
  }
  
  
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