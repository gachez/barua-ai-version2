import User from '@/img/user.png'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { db } from '@/firebase.config'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import EmailModal from './EmailModal';
import Link from 'next/link';
import OfferModal from './OfferModal';
import TextAreaModal from './TextAreaModal';

// some wierd variable names going on here - Will fix later
export default function TemplateList() {
    const [showModal, setShowModal] = React.useState(false)
    const [showAddOfferModal, setShowAddOfferModal] = React.useState(false)
    const [selectedEmail, setSelectedEmail] = React.useState('')
    const [userEmails, setUserEmails] = React.useState([])
    const [emailRefs, setEmailRefs] = React.useState([])
    const [emailObjs, setEmailObjs] = React.useState([])
    async function getOffers(){
        const userEmail = 'bri.angach98@gmail.com'
        try {
            let emailObjs = []
            let emailsFound = []
            let emailRefsL = []
        const q = query(collection(db, "templates"));
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
        setEmailRefs(emailRefsL)
        setEmailObjs(emailObjs)
        } catch (error) {
            console.error(error)
            alert(error)
        }
      }

    useEffect(() => {
        getOffers()
    }, [])

  return (
    <>
    <div className="bg-gray-900 py-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-100">Templates</h1>
          <p className="mt-2 text-sm text-gray-400">
            A list of all offers you have saved.{`(You can save upto 3 offers on the Basic plan)`}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
                setShowAddOfferModal(true)
            }}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
             Create +
          </button>
        </div>
      </div>
      </div>
      <table className="mt-6 whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Offer
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {userEmails.length === 0 ? <div className='flex h-8 w-full pt-8 pb-8 justify-center align-middle' ><h3 className='m-auto'>You haven't saved any offers yet...</h3></div> : userEmails.map((item) => (
            <tr style={{cursor: 'pointer'}} onClick={() => {
              console.log(item)
                setSelectedEmail(item)
                setShowModal(true)
            }} >
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center">
                  <div className="truncate text-sm  font-medium leading-6 text-white">{item?.offer.slice(0,100)}...</div>
                </div>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {
        showModal
        ?
        <OfferModal setShowModal={setShowModal} type="template" selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
        :
        null
    }
    {
        showAddOfferModal
        ?
        <TextAreaModal setOpen={setShowAddOfferModal} open={showAddOfferModal} />
        :
        null
    }
    </>
  )
}
