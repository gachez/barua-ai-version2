"use client"
import React from 'react'
import dynamic from "next/dynamic";
import LogoBlack from '@/img/logo-black.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image';
import { Dialog } from '@headlessui/react'
const CrispWithNoSSR = dynamic(
  () => import('@/components/CrispChat'),
  { ssr: false }
)

const FormLayout = dynamic(() => import("@/components/FormLayout"), {ssr: false})
const Banner = dynamic(() => import("@/components/Banner"), {ssr: false})

const Footer = dynamic(() => import("@/components/Footer"), {ssr: false})

const navigation = []

export default function Demo() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    return(
        <>
            <header className="sticky inset-x-0 top-0 z-50 bg-gray-950 bg-opacity-0">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Barua AI</span>
                        <Image
                            className="rounded-full"
                            src={LogoBlack}
                            alt=""
                            height={64}
                            width={64}
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    onClick={() => setMobileMenuOpen(true)}
                    >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                        {item.name}
                    </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/app/auth" className="text-sm font-semibold leading-6 text-white">
                    Sign up <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image
                        className="rounded-full"
                        src={LogoBlack}
                        alt=""
                        height={64}
                        width={64}
                    />
                    </a>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
                    <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/25">
                        <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                            >
                            {item.name}
                            </a>
                        ))}
                        </div>
                        <div className="py-6">
                        <Link
                            href={"/app/auth"}
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                        >
                            Demo
                        </Link>
                        </div>
                        <div className="py-6">
                        <Link
                            href={"/app/auth"}
                            className="-mx-3 block rounded-lg bg-indigo-500 px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                        >
                            Sign up
                        </Link>
                        </div>
                    </div>
                    </div>
                </Dialog.Panel>
                </Dialog>
            </header>
            <Banner />
            <main className="flex-col">
            <div className="mx-auto max-w-7xl py-0 sm:px-6 lg:px-8 bg-rgb(17 24 39 / var(1)) ">
                {/* Your content */}
                <FormLayout type="demo" />
            </div>
            <Footer />
            </main>
            <CrispWithNoSSR />
        </>
    )
}