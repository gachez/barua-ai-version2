import User from '@/img/user.png'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { db } from '@/firebase.config'; 
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import EmailModal from './EmailModal';
import Link from 'next/link';
import { LinearProgress, Alert } from '@mui/material';
import AddProspectModal from './AddProspectModal';
import ProspectModal from './ProspectModal';

export default function ProspectList() {
    const [showModal, setShowModal] = React.useState(false)
    const [showAddProspectListModal, setShowAddProspectListModal] = React.useState(false)
    const [prospectName, setProspectName] = React.useState('')
    const [prospectDescription, setProspectDescription] = React.useState('')
    const [selectedProspect, setSelectedProspect] = React.useState()
    const [userEmails, setUserEmails] = React.useState([])
    const [emailRefs, setEmailRefs] = React.useState([])
    const [emailObjs, setEmailObjs] = React.useState([])
    const [loadingBar, setLoadingBar] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertSeverity, setAlertSeverity] = React.useState('error')
    const [alertText, setAlertText] = React.useState('')

    function closeAlert(delay=3500){
      setTimeout(() => { 
        setShowAlert(false) 
      }, delay)
    }

    async function getProspects(){
        setLoadingBar(true)
        const userEmail = JSON.parse(localStorage.getItem('user'))?.email
        try {
            let emailObjs = []
            let emailsFound = []
            let emailRefsL = []
        const q = query(collection(db, "userProspects"), where("userEmail", "==", userEmail));
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

    
      async function saveProspect(){
        setLoadingBar(true)
        try {
        const docRef = await addDoc(collection(db, "userProspects"), {
          prospectName: prospectName,
          prospectDescription: prospectDescription,
          userEmail: JSON.parse(localStorage.getItem('user'))?.email
        });
        setShowAddProspectListModal(false)
        setShowAlert(true)
        setAlertSeverity('success')
        setAlertText("Prospect added succesfully: ", docRef.id);
        closeAlert()
        getProspects()
        setLoadingBar(false)
        } catch (error) {
          console.error(error)
          setShowAddProspectListModal(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText("Oops! Error occurred add prospect");
          closeAlert()
          setLoadingBar(false)
        }
      }

    useEffect(() => {
        getProspects()
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [])

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
                <h1 className="text-base font-semibold leading-6 text-white">Prospect list</h1>
                <p className="mt-2 text-sm text-gray-300">
                  A list of all prospects.
                </p>
              </div>
              <div className="flex mt-4 sm:ml-16 sm:mt-0">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowAddProspectListModal(true)
                  }}
                  type="button"
                  className="block rounded-md bg-green-600 px-3 py-2 text-center mx-4 text-sm font-semibold text-white hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Add +
                </button>
                <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <Link href={"#"}>
                  Upload CSV
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
                          Target name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {userEmails.map((email,index) => (
                        <tr className='cursor-pointer' key={index} onClick={() => {
                          setShowModal(true)
                          setSelectedProspect(email)
                        }} >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {email?.prospectName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{email?.prospectDescription?.slice(0,80)}...</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">      
                          <button
                            type="button"
                            className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                          >
                            View
                          </button></td>
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
        <ProspectModal setShowModal={setShowModal} selectedProspect={selectedProspect} setSelectedProspect={setSelectedProspect} />
        :
        null
    }
    {
      showAddProspectListModal
      ?
      <AddProspectModal 
        prospectName={prospectName}
        prospectDescription={prospectDescription}
        setProspectName={setProspectName}
        setProspectDescription={setProspectDescription}
        open={showAddProspectListModal}
        setOpen={setShowAddProspectListModal}
        loadingBar={loadingBar}
        showAlert={showAlert}
        alertSeverity={alertSeverity}
        alertText={alertText}
        saveProspect={saveProspect}
      />
      :
      null
    }
    </>
  )
}
