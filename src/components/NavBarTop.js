"use client"
import React, { Fragment, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '@/img/logo-black.png'
import Avatar from '@/img/avatar.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase.config';
import axios from 'axios';
import Config from '@/config';
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, BoltIcon,BookmarkIcon, CodeBracketIcon ,CircleStackIcon, Square3Stack3DIcon, BanknotesIcon} from '@heroicons/react/20/solid'
import Link from 'next/link';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';
import { getSignedInUserCookie } from '@/utils';

export default function NavBarTop(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subscriptionModal, setSubscriptionModal] = useState(false)
  const [paymentURI, setPaymentURI] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  async function makeOrder (details){
    try {
        const docRef = await addDoc(collection(db, "orders"), details)
        console.log("Order created with ID: ", docRef.id)
      } catch (e) {
        console.error("Error adding order: ", e)
      }
    }

  function startPayment(){
    const payment =   {
      "type":"subscription",
      "order":
          {
          "currency": "USD",
          "account_number": typeof window !== "undefined" ? localStorage.getItem('userAccount'): null,
          "amount": 39,
          "description": "Buy subscription",
          "billing_address": {
              "email_address": getSignedInUserCookie(),
              "phone_number": null,
              "country_code": "",
              "first_name": typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')).name : null,
              "middle_name": "",
              "last_name": "",
              "line_1": "",
              "line_2": "",
              "city": "",
              "state": "",
              "postal_code": null,
              "zip_code": null
          }
      }
    }
    axios.post(`${Config.API_URI}/make-payment`,payment,{
      'isSubscription':true
    })
    .then(res => {
        setPaymentURI(res.data.redirect_url)
        // setMerchantID(res.data.merchant_reference)
        typeof window !== "undefined" ? localStorage.setItem('merchantID',res.data.merchant_reference) : null
        setShowPaymentModal(true)
        makeOrder({
            merchantID:res.data.merchant_reference,
            amount: 39,
            description: 'Buy credits',
            user: getSignedInUserCookie(),
            type:'subscription',
            status: 'incomplete',
            currency: "USD",
            credits: 500,
            created:  `${new Date()}`,
            accountNumber: typeof window !== "undefined" ? localStorage.getItem('userAccount') : 'N/A'
        }).then(() => {
            setShowPaymentModal(true)
        })
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
      console.log('m')
    })
  }
  const {
    asPath,        // the value: "/question/how-do-you-get-the-current-url-in-nextjs/"
    pathname,   // the value: "/question/[slug]"
  } = useRouter();

  const userNavigation = [
    { name: 'Sign out', href: '/app/auth' },
  ]
  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon, current: asPath.includes('dashboard') },
    { name: 'Email generator', href: '/app/generator', icon: CodeBracketIcon, current: asPath.includes('generator') },
    { name: 'Saved emails', href: '/app/emails', icon: BookmarkIcon, current: asPath.includes('emails') },
    { name: 'Offers', href: '/app/offers', icon: FolderIcon, current: asPath.includes('offers') },
    { name: 'Database', href: '/app/database', icon: Square3Stack3DIcon, current: asPath.includes('database')},
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10 mt-4">
                    <div className="flex h-16 shrink-0 items-center mt-4">
                      <Image
                        className="rounded-full"
                        src={Logo}
                        alt="Barua AI"
                        width={32}
                        height={32}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => {
                                    props.setNavLoading(true)
                                  }}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center mt-4">
              <Image
                className="rounded-full mt-8 mb-8"
                src={Logo}
                alt="BaruaAI - the best outreach emal generator for busy professionals"
                width={64}
                height={64}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            props.setNavLoading(true)
                          }}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
             
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-950 bg-gray-950 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 sticky top-0 ">
              <div className="relative flex flex-1 bg-gray-950" action="#" method="GET">  
                <div
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className='flex justify-center items-center text-gray-100'>
                  <CircleStackIcon width={18} height={18} />
                  <span className='px-1 text-gray-100'>{typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user'))?.creditsAvailable : ''} Credits</span>
                </div>
                <button
                  onClick={() => {
                    props.setOpen(true)
                  }}
                  type="button"
                  className="hidden sm:inline-flex  items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  <BanknotesIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Buy credits
                </button>
                {
                  typeof window !== "undefined" ? 
                  (JSON.parse(window.localStorage.getItem('user'))?.isSubscribed
                  ?
                  null
                  :
                  <Link
                  href="https://baruaai.lemonsqueezy.com/checkout/buy/66eb5f46-2783-452d-a9ca-35b8ef143062?discount=0"
                  className="lemonsqueezy-button hidden sm:inline-flex  items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <BoltIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Upgrade
                  </Link>)
                  :
                  null
                }
                {
                  typeof window !== "undefined" && JSON.parse(window.localStorage.getItem('user'))?.isSubscribed ?
                  <div className='flex justify-center items-center'>
                    <BoltIcon width={18} height={18} />
                    <span className='px-1 text-green-400'>Premium</span>
                  </div>
                  :
                  null
                }
                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="rounded-full"
                      src={Avatar}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-100" aria-hidden="true">
                        {typeof window !== "undefined" ?  JSON.parse(window.localStorage.getItem('user'))?.name : ''}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as="div"
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="py-10 bg-gray-950">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Your content */}
              {props.mainComponent}
              </div>
          </main>
        </div>
      </div>
      {
        showPaymentModal
        ?
        <SubscriptionPaymentModal paymentURI={paymentURI} />
        :
        null
      }
    </>
  )
}
