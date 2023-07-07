import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { getAllPostIds, getPostData } from '../../lib/posts';
import { Dialog } from '@headlessui/react'
import Footer from "@/components/Footer";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LogoBlack from '@/img/logo-white.png'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  console.log('ASAAS ', postData)
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const navigation = [
    { name: 'How it works', href: '#features' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' }
  ]

export default function Posts({ postData }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    return (
        <>
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
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{postData.title}</h1>
            <figure className="mt-16">

            </figure>  
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
        </div> 
        <Footer />
        </> 
    )
}