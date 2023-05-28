import User from '@/img/user.png'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { db } from '@/firebase.config'; 
import { collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import OfferModal from './OfferModal';
import TextAreaModal from './TextAreaModal';
import { getSignedInUserCookie } from '@/utils';
import { LinearProgress, Alert } from '@mui/material';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import DeleteModal from './DeleteModal';

// some wierd variable names going on here - Will fix later
export default function OfferList() {
    const [showModal, setShowModal] = React.useState(false)
    const [showAddOfferModal, setShowAddOfferModal] = React.useState(false)
    const [selectedEmail, setSelectedEmail] = React.useState('')
    const [userEmails, setUserEmails] = React.useState([])
    const [emailRefs, setEmailRefs] = React.useState([])
    const [emailObjs, setEmailObjs] = React.useState([])
    const [newOffer, setNewOffer] = React.useState('')
    const [offerName, setOfferName] = React.useState('')
    const [loadingBar, setLoadingBar] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertSeverity, setAlertSeverity] = React.useState('success')
    const [alertText, setAlertText] = React.useState('')
    const [deleteOfferModal, setDeleteOfferModal] = React.useState(false)
    const [edit, setEdit] = React.useState(false)

    function closeAlert(delay=3500){
      setTimeout(() => { 
        setShowAlert(false) 
      }, delay)
    }

    async function getOffers(){
        setLoadingBar(true)
        const userEmail = getSignedInUserCookie()
        try {
            let emailObjs = []
            let emailsFound = []
            let emailRefsL = []
        const q = query(collection(db, "userOffers"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          emailsFound.push(doc.data())
          emailRefsL.push(doc.id)
          emailObjs.push({
            id: doc.id,
            ...doc.data()
          })
        });
        console.log(emailObjs)
        setUserEmails(emailObjs)
        setEmailRefs(emailRefsL)
        setEmailObjs(emailObjs)
        setLoadingBar(false)
        } catch (error) {
            setLoadingBar(false)
            console.error(error)
            setShowAlert(true)
            setAlertSeverity('error')
            setAlertText('Something went wrong fetching your offers.')
            closeAlert()
        }
      }

    useEffect(() => {
        getOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function saveOffer(){
      setLoadingBar(true)
      try {
      const docRef = await addDoc(collection(db, "userOffers"), {
        createdAt: new Date().toISOString(),
        name: offerName,
        offer: newOffer,
        userEmail: JSON.parse(localStorage.getItem('user'))?.email
      });
      setShowAddOfferModal(false)
      setShowAlert(true)
      setAlertSeverity('success')
      setAlertText("Offer created succesfully: ", docRef.id);
      closeAlert()
      getOffers()
      setLoadingBar(false)
      } catch (error) {
        console.error(error)
        setShowAddOfferModal(false)
        setShowAlert(true)
        setAlertSeverity('error')
        setAlertText("Oops! Error occurred creating your offer ");
        closeAlert()
        setLoadingBar(false)
      }
    }

    async function deleteOffer(documentId) { 
      // Create a document reference
      const documentRef = doc(db, 'userOffers', documentId);

      // Delete the document
      deleteDoc(documentRef)
        .then(() => {
          setDeleteOfferModal(false)
          setShowAlert(true)
          setAlertSeverity('success')
          setAlertText("Offer deleted: ", documentRef.id);
          getOffers()
          closeAlert()
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
          setDeleteOfferModal(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText("Oops! Error occurred deleting your offer");
          closeAlert()
      });
    }

    async function editOffer(documentId, updates){
      setLoadingBar(true)
      // Create a document reference
      const documentRef = doc(db, 'userOffers', documentId);

      // Update the document
      updateDoc(documentRef, updates)
        .then(() => {
          setShowAlert(true)
          setAlertSeverity('success')
          setAlertText("Offer edited: ", documentRef.id);
          setShowAddOfferModal(false)
          getOffers()
          setLoadingBar(false)
          closeAlert()
        })
        .catch((error) => {
          console.error('Error updating document:', error);
          setShowAddOfferModal(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText("Oops! Error occurred deleting your offer");
          setLoadingBar(false)
        });
    }

  return (
    <>
    <div className="bg-gray-900">
      {
        loadingBar
        ?
        <LinearProgress />
        :
        null
      }
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          {
            showAlert
            ?
            <Alert style={{zIndex: 99}} severity={alertSeverity}>{alertText}</Alert>
            :
            null
          }
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">Offers</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A list of saved offers.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddOfferModal(true)
                  }}
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Offer +
                 </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Name
                        </th>
                     
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Offer
                        </th>

                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Created at
                        </th>
                     
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {userEmails.map((email,index) => (
                        <tr key={index} className='cursor-pointer' onClick={() => {
                          setSelectedEmail(email)
                        }} >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {email?.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {email?.offer.slice(0,50)}...
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {email?.createdAt?.slice(0,10)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">      
                          <button
                            onClick={() => {
                              setShowModal(true)
                            }}
                            type="button"
                            className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                          >
                            View
                          </button></td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300" >
                            <button
                              onClick={() => {
                                setEdit(true)
                                setShowAddOfferModal(true)
                              }}
                              type="button"
                              className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                              
                            <PencilSquareIcon width={16} height={16} />
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300" >
                            <button
                              onClick={() => {
                                setDeleteOfferModal(true)
                              }}
                              type="button"
                              className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                              
                            <TrashIcon width={16} height={16} />
                            </button>
                          </td>
                        </tr>
                      )).reverse()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
        showModal
        ?
        <OfferModal saveOffer={saveOffer} loadingBar={loadingBar} setLoadingBar={setLoadingBar} setNewOffer={setNewOffer} setShowModal={setShowModal} selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
        :
        null
    }
    {
        showAddOfferModal
        ?
        <TextAreaModal 
          setAlertSeverity={setAlertSeverity} 
          setAlertText={setAlertText} 
          setShowAlert={setShowAlert} 
          alertSeverity={alertSeverity} 
          alertText={alertText} 
          showAlert={showAlert} 
          offerName={offerName} 
          setOfferName={setOfferName} 
          saveOffer={saveOffer} 
          newOffer={newOffer} 
          loadingBar={loadingBar} 
          setLoadingBar={setLoadingBar} 
          setNewOffer={setNewOffer} 
          edit={edit}
          type="offer" 
          setOpen={setShowAddOfferModal} 
          closeAlert={closeAlert}
          open={showAddOfferModal}
          editOffer={editOffer}
          selectedOffer={selectedEmail}
          />
        :
        null
    }
    {
      deleteOfferModal
      ?
      <DeleteModal
        open={deleteOfferModal}
        setOpen={setDeleteOfferModal}
        documentToDelete="offer"
        deleteDoc={deleteOffer}
        selectedDoc={selectedEmail}
      />
      :
      null
    }
    </>
  )
}
