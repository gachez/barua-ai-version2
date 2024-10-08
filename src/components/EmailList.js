import User from '@/img/user.png'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { db } from '@/firebase.config'; 
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import EmailModal from './EmailModal';
import Link from 'next/link';
import { LinearProgress, Alert } from '@mui/material';
import DeleteModal from './DeleteModal';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function EmailList() {
    const [showModal, setShowModal] = React.useState(false)
    const [selectedEmail, setSelectedEmail] = React.useState('')
    const [userEmails, setUserEmails] = React.useState([])
    const [emailRefs, setEmailRefs] = React.useState([])
    const [emailObjs, setEmailObjs] = React.useState([])
    const [loadingBar, setLoadingBar] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertSeverity, setAlertSeverity] = React.useState('error')
    const [alertText, setAlertText] = React.useState('')
    const [deleteModal, setDeleteModal] = React.useState(false)

    function closeAlert(delay=3500){
      setTimeout(() => { 
        setShowAlert(false) 
      }, delay)
    }

    async function getEmails(){
        setLoadingBar(true)
        const userEmail = JSON.parse(localStorage.getItem('user'))?.email
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
            ...doc.data()
          })
        });
        console.log(emailObjs)
        setUserEmails(emailObjs)
        setEmailRefs(emailRefsL)
        setEmailObjs(emailObjs)
        setLoadingBar(false)
        closeAlert()
        } catch (error) {
            console.error(error)
            setShowAlert(true)
            setAlertSeverity('error')
            setAlertText('Something went wrong fetching your emails')
            setLoadingBar(false)
            closeAlert()

        }
      }

    useEffect(() => {
        getEmails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function deleteEmail(documentId) { 
      // Create a document reference
      const documentRef = doc(db, 'userEmails', documentId);

      // Delete the document
      deleteDoc(documentRef)
        .then(() => {
          setDeleteModal(false)
          setShowAlert(true)
          setAlertSeverity('success')
          setAlertText("Email deleted: ", documentRef.id);
          getEmails()
          closeAlert()
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
          setDeleteModal(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText("Oops! Error occurred deleting your email");
          closeAlert()
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
      {
            showAlert
            ?
            <Alert style={{zIndex: 99}} severity={alertSeverity}>{alertText}</Alert>
            :
            null
          }
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">User emails</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A list of all saved emails.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <Link href={"/app/generator"}>
                  Email +
                  </Link>
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700 h-3/4">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Target
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Offer
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
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
                            {email?.targetName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{email?.email?.slice(0,30)}...</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{email?.offer?.slice(0,30)}...</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{email?.createdAt?.slice(0,10)}</td>
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
                                setDeleteModal(true)
                              }}
                              type="button"
                              className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                              
                            <TrashIcon width={16} height={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
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
        <EmailModal setShowModal={setShowModal} selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
        :
        null
    }
    {
      deleteModal
      ?
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        documentToDelete="email"
        deleteDoc={deleteEmail}
        selectedDoc={selectedEmail}
      />
      :
      null
    }
    </>
  )
}
