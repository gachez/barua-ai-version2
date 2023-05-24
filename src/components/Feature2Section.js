import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import FeatureVid from '@/img/prospects.gif'
import Image from 'next/image'
import Link from 'next/link'

export default function Feature2Section() {
  return (
    <div id="features" className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Streamline Your Outreach with Saved Prospect Lists</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Boost your productivity with our saved prospect list feature. Preload your prospect&apos;s data, and generate personalized messages in a snap. It&apos;s efficient, it&apos;s effective, and it&apos;s set to turbocharge your conversion rates.
              </p>
            </div><br />
            <Link
                  href="/app/demo"
                  className="rounded-full bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Try free
            </Link>
          </div>
          <Image
            src={FeatureVid}
            alt="Barua AI"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
