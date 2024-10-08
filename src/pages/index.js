'use client'
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import FeatureSection from '@/components/FeatureSection'
import FAQ from '@/components/FAQ'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import LandingFooter from '@/components/LandingFooter'
import Image from 'next/image'
import Hero from '@/img/generated.png'
import LogoBlack from '@/img/logo-white.png'
import Link from 'next/link'
import CTA from '@/components/CTA'
import Feature1Section from '@/components/Feature1Section'
import Feature2Section from '@/components/Feature2Section'
import Feature3Section from '@/components/Feature3Section'
import Feature4Section from '@/components/Feature4Section'
import dynamic from 'next/dynamic'
import { getSortedPostsData } from '../lib/posts';
import BlogSection from '@/components/BlogSection'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const CrispWithNoSSR = dynamic(
  () => import('@/components/CrispChat'),
  { ssr: false }
)

const navigation = [
  { name: 'How it works', href: '#features' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '#blog' }
]

export default function SuccessPayment({ allPostsData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [communicationMethod, setCommunicationMethod] = useState('email');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDeleting(true);
      setTimeout(() => {
        setCommunicationMethod(prevMethod => prevMethod === 'sequence' ? 'email' : 'sequence');
        setDeleting(false);
      }, 2500);
    }, 5000);  // adjust the time according to your animation speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-900">
      <header className="sticky inset-x-0 top-0 z-50 bg-gray-950 bg-opacity-80">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Barua AI</span>
              <Image
                className="rounded-full"
                src={LogoBlack}
                alt=""
                height={64}
                width={64}
              />
            </a>
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
            <Link
              href={"/app/auth"}
              className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </Link>
            <Link
              href={"/app/auth"}
              className="rounded-full bg-green-600 px-4 py-2.5 text-sm mx-4 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Generate now
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Barua AI</span>
                <Image
                className="rounded-full"
                src={LogoBlack}
                alt="Barua AI"
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
                    Generate now
                  </Link>
                </div>
                <div className="py-6">
                <button
                  type="button"
                  className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Generate high converting sales <span className={deleting ? 'typewriter-text-deleting text-green-400' : 'typewriter-text text-green-400'}>{communicationMethod}s</span> in seconds
            </h1>
              <h1 className="mt-6 text-lg leading-8 text-gray-300">
              Our platform transforms your key product details and objectives into persuasive prose, tailor-made to hook your audience and skyrocket conversion rates.
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                    href={"/app/auth"}
                    className="rounded-full bg-green-600 px-4 py-2.5 text-sm mx-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Generate now
                  </Link>
              </div>
            </div>
            {/* <Image
              src={Hero}
              alt="Cold email generator using the best AI technology in the world"
              width={2432}
              height={1442}
              className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
            /> */}
          </div>
        </div>
      </div>
      <FeatureSection />
      <Feature4Section />
      <Feature3Section />
      <Feature1Section />
      <Feature2Section />
      <CTA />
      <Pricing />
      <FAQ />
      <BlogSection posts={allPostsData} />
      <LandingFooter />
      <CrispWithNoSSR />
    </div>
  )
}
