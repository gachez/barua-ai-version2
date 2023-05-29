"use client"
import LogoBlack from '@/img/logo-black.png'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { generateAccountNumber, getSignedInUserCookie, setSignedInUserCookie  } from '@/utils'
import { auth } from "@/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/firebase.config';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alert from '@mui/material/Alert'
import Google from '@/img/search.png';
import Footer from '@/components/Footer';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import dynamic from 'next/dynamic'

const CrispWithNoSSR = dynamic(
  () => import('@/components/CrispChat'),
  { ssr: false }
)



export default function Auth() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertSeverity, setAlertSeverity] = React.useState('success')
  const [alertText, setAlertText] = React.useState('Success! signed in succesfully.')  

    async function createUser (firstName, email){
      try {
          const accNumber = generateAccountNumber()
          const docRef = await addDoc(collection(db, "users"), {
            name: firstName,
            email: email,
            isSubscribed: false,
            freeGeneration: true,
            creditsAvailable: 100,
            subscriptionType: 'none',
            accountNumber: accNumber
          });
          console.log("User created with ID: ", docRef.id);
          window.localStorage.setItem('userAccount',accNumber)
          router.push('/app/dashboard')
          setIsLoading(false)
        } catch (e) {
          console.error("Error adding user: ", e);
          setIsLoading(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText('Oops! error occurred creating a user')
          closeAlert()
        }
  }

  async function signInWithGoogle(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Signed in 
        setIsLoading(false)
        setSignedInUserCookie(user.email)
        router.push('/app/dashboard')
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setIsLoading(false)
        setShowAlert(true)
        setAlertSeverity('error')
        setAlertText('Oops! '+errorMessage)
        console.log(errorMessage)
        closeAlert()
      });
  }

  function closeAlert(delay = 3500) {
    setTimeout(() => {
      setShowAlert(false)
    }, delay)
  }

  function signIn(){
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          // Signed in 
          setIsLoading(false)
          setSignedInUserCookie(email)
          router.push('/app/dashboard')
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setIsLoading(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText('Oops! '+errorMessage)
          closeAlert()
      })
      return
  }

  function signUp(email,password,firstName) {

    console.log(email, password, firstName)
    setIsLoading(true)
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
          console.log('signed up')
          createUser(firstName,email)
          // sendEmail()
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setIsLoading(false)
          setShowAlert(true)
          setAlertSeverity('error')
          setAlertText('Oops! '+errorMessage)
          closeAlert()
      })
      return
  }
    return (
      <>
      {
        isLoading
        ?
        <LinearProgress />
        :
        null
      }
      {
        showAlert
        ?
        <Alert style={{zIndex: 99}} severity={alertSeverity}>{alertText}</Alert>
        :
        null
      }
        <div style={{opacity: isLoading?0.1:1}} className="bg-gray-950 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link href={"/"} >
              <Image
                className="mx-auto rounded-full"
                src={LogoBlack}
                alt="Barua AI Email generator sell anything easily"
                width={64}
                height={64}
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {
                isSignIn
                ?
                (
                    <div className="space-y-6" >
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                          Password
                        </label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          return isSignIn ? signIn() : signUp(email, password, firstName )
                        }}
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        {isSignIn?'Sign in':'Create account'} 
                      </button>
                    </div>
                  </div>
                )
                :
                (
                    <form className="space-y-6" action="#" method="POST">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => {
                            setFirstName(e.target.value)
                          }}
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                          Password
                        </label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <input
                          onChange={(e) => {
                             setPassword(e.target.value)
                          }}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
      
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                          Confirm Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <Link
                      href={""}
                        onClick={(e) => {
                          e.preventDefault()
                          return isSignIn ? signIn() : signUp(email, password, firstName)
                        }}
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                      {isSignIn?'Sign in':'Create account'} 
                      </Link>
                    </div>
                  </form>
                )
            }
              <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-gray-950 px-6 text-white">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div
                  href="#"
                  onClick={() => {
                    signInWithGoogle()
                  }}
                  className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                  <Image
                   src={Google}
                   height={20}
                   width={20}
                  />
                  <span className="text-sm font-semibold leading-6">Google</span>
                </div>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-400">
              {isSignIn?'Not a member?':'Already a member?'}{' '}
              <div onClick={() => {
                isSignIn ? setIsSignIn(false) : setIsSignIn(true)
              }} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300 cursor-pointer">
                {isSignIn?'Create account':'Sign in'} 
              </div>
            </p>
          </div>
        </div>
        <CrispWithNoSSR />
        <Footer />
      </>
    )
  }
  