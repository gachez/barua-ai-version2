import React, { useRef } from "react";
import axios from "axios";
import Image from 'next/image';
import Bookmark from '@/img/save-instagram.png';
import fileDownload from 'js-file-download'
import Copy from '@/img/copy.png';
import Alert from '@mui/material/Alert';
import { collection, addDoc } from "firebase/firestore";
import Config from '@/config';
import { db } from '@/firebase.config';
import { query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import LinearProgress from '@mui/material/LinearProgress';
import Finetune from '@/img/magic-wand.png'
import TextAreaModal from "./TextAreaModal";
import { getSignedInUserCookie, separateEmails } from "@/utils";
import FormNav from "./FormNav";

function randomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let word = "";
  for (let i = 0; i < 6; i++) {
    word += letters[Math.floor(Math.random() * letters.length)];
  }
  return `baruaAI-${word}`;
}

export default function SequenceFormLayout(props) {
  const contentFormRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // optional, for smooth scrolling
    });
  };


  const [targetName, setTargetName] = React.useState("");
  const [productDesc, setProductDesc] = React.useState("");
  const [sequenceNumber, setSequenceNumber] = React.useState(1);
  const [sequenceType, setSequenceType] = React.useState('');
  const [targetDesc, setTargetDesc] = React.useState("");
  const [userEmails, setUserEmails] = React.useState([]);
  const [mood, setMood] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [generatedEmail, setGeneratedEmail] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertText, setAlertText] = React.useState('')
  const [alertStatus, setAlertStatus] = React.useState('error')
  const [isFormReady, setIsFormReady] = React.useState(false);
  const [loadingBar, setLoadingBar] = React.useState(false)
  const [showFormAlert, setShowFormAlert] = React.useState(false)
  const [userId, setUserId] = React.useState('lala')
  const [savedOffers, setSavedOffers] = React.useState([])
  const [showFineTuneModal, setShowFineTuneModal] = React.useState(false)
  const [instruction, setInstruction] = React.useState('')
  const [savedProspects, setSavedProspects] = React.useState([])
  const [userDocumentRef,setUserDocumentRef] = React.useState('')
  const [sequences, setSequences] = React.useState([])
  const [sequenceString, setSequenceString] = React.useState('')
  const [currentSequenceIndex, setCurrentSequenceIndex] = React.useState(0);

  function closeAlert(delay = 3500) {
    setTimeout(() => {
      setShowAlert(false)
      setShowFormAlert(false)
    }, delay)
  }

  function downloadEmail() {
    setLoadingBar(true)
    axios.post(`${Config.API_URI}/download-emails/${userId}`, {
      emailData: sequenceString
    },
      {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, `${randomWord()}.docx`)
        // navigate('/app/success')
        setAlertStatus('success')
        setAlertText('✨ Succesfully donloaded email!')
        setShowFormAlert(true)
        return
      })
      .catch(err => {
        console.log(err)
        setAlertStatus('error')
        setAlertText('Error occured downloading email!')
        setShowFormAlert(true)
      })
      .finally(() => {
        setLoadingBar(false)
        closeAlert()
      })
  }

  async function getEmails(){
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
    closeAlert()
    } catch (error) {
        console.error(error)
        setShowAlert(true)
        setAlertStatus('error')
        setAlertText('Something went wrong fetching your emails')
        setLoadingBar(false)
        closeAlert()
    }
  }

  async function getOffers() {
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email
    try {
      let emailObjs = []
      let offersFound = []
      let emailRefsL = []
      const q = query(collection(db, "userOffers"), where("userEmail", "==", userEmail));
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
      setSavedOffers(offersFound)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  async function getProspects() {
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email
    try {
      let prospectsFound = []
      const q = query(collection(db, "userProspects"), where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        prospectsFound.push(doc.data())
      })
      console.log(prospectsFound)
      setSavedProspects(prospectsFound)
    } catch (error) {
      console.error(error)
    }
  }


  async function copyTextFromTextarea() {
    const textarea = document.getElementById('contentForm');
    try {
      await navigator.clipboard.writeText(textarea.value);
      textarea.select()
    } catch (error) {
      console.error('Error copying text:', error);
    }
  }

  async function editUserCredits() {
    const userRef = doc(db, "users", userDocumentRef)
    try {
      await updateDoc(userRef, {
        creditsAvailable: JSON.parse(localStorage.getItem('user')).creditsAvailable - 1
      } );
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    setIsFormReady(true);
    if(props.type === 'demo') {
      return
    }
    getOffers()
    getEmails()
    getProspects()
    getUser()
  }, [])


  function generateSequence() {
    setGeneratedEmail('')
    const creditsAvailable = JSON.parse(localStorage.getItem('user'))?.creditsAvailable
    if(creditsAvailable === 0) {
      setAlertText('You have run out of credits. Please upgrade or buy more to generate.');
      setAlertStatus('error')
      setShowAlert(true)
      closeAlert()
    }
    window.location.href = '#'
    setLoading(true);
    axios
      .post(
        `${Config.API_URI}/generate-sequence`,
        {
          offer: productDesc,
          avatar: targetDesc,
          mood: mood,
          numberSequence: sequenceNumber,
          sequenceType: sequenceType
        },
        {
          // Set the 'Content-Disposition' header to 'inline'
          headers: {
            "Content-Disposition": "inline",
          },
        }
      )
      .then((response) => {
        // Extract the data from the response
        const data = response.data;
        console.log(data);
        setSequenceString(data)
        getUser();
        editUserCredits()
        setSequences(separateEmails(data))
        setLoading(false);
        setLoaded(true);
        // invoke the function
        setTimeout(() => {
          scrollToBottom();
        }, 200)
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
        setLoading(false);
        setAlertText('Something went wrong generating your email. Please try again');
        setAlertStatus('error')
        setShowAlert(true)
        closeAlert()

      })
  }

  function improveEmail() {
    setLoadingBar(true);
    axios
      .post(
        `${Config.API_URI}/fine-tune/email`,
        {
          email: generatedEmail.split("\n").join("").trim(),
          instruction: instruction
        },
        {
          // Set the 'Content-Disposition' header to 'inline'
          headers: {
            "Content-Disposition": "inline",
          },
        }
      )
      .then((response) => {
        setGeneratedEmail('')
        setShowFineTuneModal(false)
        // Extract the data from the response
        const data = response.data;
        console.log(data);
        editUserCredits();
        const completions = data.split(' ');
        // Stream words one by one
        completions.forEach((word, index) => {
          setTimeout(() => {
            setGeneratedEmail((prevText) => prevText + ' ' + word);
          }, index * 50); // Adjust the delay (in ms) between words as needed
        });
        getUser();
        setLoadingBar(false);
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
        setLoadingBar(false);
        setAlertText('Something went wrong improving your email. Please try again');
        setAlertStatus('error')
        setShowAlert(true)
        closeAlert()
      })
  }

  async function getUser(){
    try {
    const q = query(collection(db, "users"), where("email", "==", getSignedInUserCookie()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      window.localStorage.setItem('user',JSON.stringify(doc.data()))
      setUserDocumentRef(`${doc.id}`)
    });
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <>
      {
        isFormReady &&
        <form>
          {
            showAlert
              ?
              <Alert style={{ zIndex: 99 }} severity={alertStatus}>{alertText}</Alert>
              :
              null
          }

          <div className="space-y-12 py-4">
            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                {props.type === 'demo' ? 'Experience the Power of Barua AI' : 'Sequence Generator'}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                We need a few details before we can make your awesome message.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Offer 📢
                    </label>
                    <div className="mt-2 -space-y-px rounded-md shadow-sm">
                      {
                        props.type === "demo"
                          ?
                          null
                          :
                          <div>
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              onChange={(e) => {
                                console.log(e.target.value)
                                setProductDesc(e.target.value)
                              }}
                              className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option>Use saved offer</option>
                              {
                                savedOffers.map((it, index) => {
                                  return (
                                    <option key={index} value={it.offer} className="text-gray-900">{it?.name}</option>
                                  )
                                })
                              }
                            </select>
                          </div>
                      }
                      <div>
                        <label htmlFor="postal-code" className="sr-only">
                          Write below
                        </label>
                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          Describe what you&apos;re offering. Are you selling a product, a service, or maybe proposing a partnership? Your offer is the core of your email, so be clear and compelling.
                        </p>
                        <textarea
                          onChange={(e) => {
                            setProductDesc(e.target.value)
                          }}
                          rows={8}
                          type="text-area"
                          name="offer"
                          id="offer"
                          value={productDesc}
                          className="relative block w-full mt-2 rounded-none rounded-b-md border-0 bg-white/5 py-1.5 text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="e.g My name is Brian and I am offering graphic design services that help..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Target descrption 📉
                  </label>
                  <div className="col-span-full">
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                      Give us a snapshot of your prospect. What industry are they in?
                      What&apos;s their role? What challenges do they face?
                      The more detailed and precise your description,
                      the better the AI can tailor the message.
                    </p>
                    <div className="mt-2">
                      <textarea
                        id="product-details"
                        name="product-details"
                        onChange={(e) => {
                          setTargetDesc(e.target.value);
                        }}
                        rows={4}
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset placeholder:text-gray-600 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        value={targetDesc}
                        placeholder="e.g Shiv runs a bookkeeping agency that works with SMEs and freelancers. They have a website but it does not convert users as much as they want and does not show social proof."
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Mood / Tone
                  </label>
                  <div className="mt-2">
                    <select
                      id="tone"
                      name="tone"
                      onChange={(e) => {
                        setMood(e.value)
                      }}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option className="cursor-pointer" >Choose a tone</option>
                      <option value={'professional'}>Professional</option>
                      <option value={'informal'} >Conversational</option>
                      <option value={'friendly'}>Friendly</option>
                      <option value={'urgent'} >Urgent</option>
                      <option value={'persuasive'} >Persuasive</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="sequenceType"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Type of sequence
                  </label>
                  <div className="mt-2">
                    <select
                      id="tone"
                      name="tone"
                      onChange={(e) => {
                        setMood(e.value)
                      }}
                      autoComplete="country-name"
                      className="block w-full cursor-pointer rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option value={'sales-campaign'}>Marketing campaigns</option>
                      <option value={'nurturing'} >Lead nurturing</option>
                      <option value={'onboarding'}>Customer onboarding</option>
                      <option value={'followup'} >Sales follow-ups</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="sequenceType"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Number of emails
                  </label>
                  <div className="mt-2">
                    <input type="number" className="block w-full cursor-pointer rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black" defaultValue={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                if (targetDesc === '' || productDesc === '' || mood === '') {
                  console.log(targetName, targetDesc, productDesc, mood)
                  setAlertText('Please fill all fields in order to generate an email')
                  window.location.href = '#'
                  setAlertStatus('error')
                  setShowAlert(true)
                  closeAlert()
                  return
                }
                setMood(document.getElementById("tone").value);
                generateSequence();
              }}
            >
              Generate sequence
            </button>
          </div>
        </form>
      }
      <br />
      <br />
      {loaded ? (
        <>
        <FormNav setCurrentSequenceIndex={setCurrentSequenceIndex} currentSequenceNumber={currentSequenceIndex} sequenceNumber={3} />
        <form id="wyswig">
          {
            showFormAlert
              ?
              <Alert style={{ zIndex: 99 }} severity={alertStatus}>{alertText}</Alert>
              :
              null
          }
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                  {/* <button
                    type="button"
                    onClick={() => {
                      if (props.type === "demo") {
                        return
                      }
                      saveEmail()
                    }}
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <div className="tooltip" data-tip={props.type === "demo" ? "Sign up to use this feature" : "Save this message"}>
                      <Image
                        src={Bookmark}
                        width={24}
                        height={24}
                        alt="Save"
                      />
                      <span className="sr-only">Add list</span>
                    </div>
                  </button> */}
                  <button
                    type="button"
                    onClick={() => {
                      copyTextFromTextarea()
                    }}
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <div className="tooltip" data-tip="Copy message" >
                      <Image
                        src={Copy}
                        width={24}
                        height={24}
                        alt="rephrase"
                        className="cursor-pointer"
                      />
                      <span className="sr-only">Copy</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadEmail()
                    }}
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Download</span>
                  </button>
                </div>
              </div>

              <div
                id="tooltip-fullscreen"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Show full screen
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              {
                loadingBar
                  ?
                  <LinearProgress />
                  :
                  null
              }
              <textarea
                style={{ opacity: loadingBar ? 0.2 : 1 }}
                id="contentForm" ref={contentFormRef}
                rows="20"
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write an article..."
                value={sequences[currentSequenceIndex]}
                onChange={e => {
                  setGeneratedEmail(e.target.value)
                }}
              ></textarea>
            </div>
          </div>
        </form>
        </>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          display: loading ? "flex" : "none",
        }}
      >
        <div className="text-center h-screen flex justify-center items-center">
          <div role="status" style={{ width: "100vw" }}>
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Robots at work. Please wait...</span>
          </div>
        </div>
      </div>
      {
        showFineTuneModal
          ?
          <TextAreaModal
            setAlertSeverity={setAlertStatus}
            setAlertText={setAlertText}
            setShowAlert={setShowAlert}
            alertSeverity={alertStatus}
            alertText={alertText}
            showAlert={showAlert}
            loadingBar={loadingBar}
            setLoadingBar={setLoadingBar}
            type="tune"
            improveEmail={improveEmail}
            instruction={instruction}
            setInstruction={setInstruction}
            setOpen={setShowFineTuneModal}
            closeAlert={closeAlert}
            open={showFineTuneModal} />
          :
          null
      }
    </>
  );
}
