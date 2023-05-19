import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import FeatureVid from '@/img/barua.gif'
import Image from 'next/image'

const features = [
  {
    name: "Provide your prospect's name",
    description:
      'No more generic emails. Personalization is the key to a response',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Detail your offer.',
    description: "Whether it's a product, service, or partnership proposal, just give us the details.",
    icon: LockClosedIcon,
  },
  {
    name: 'Describe your prospect.',
    description: "Help us understand who you're reaching out to, and we'll tailor the message to resonate with them.",
    icon: ServerIcon,
  },
  {
    name: 'Choose your tone.',
    description: "Whether you prefer a formal, casual, or friendly tone, we’ve got you covered.",
    icon: ServerIcon,
  },
  
]

export default function Feature1Section() {
  return (
    <div id="features" className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Save Time with Preloaded Offers</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Say goodbye to repetitive typing. With Barua AI, you can save your offers for quick and easy email generation. Select a saved offer, and let our AI tool do the rest. It's time-saving functionality at its best!
              </p>
            </div>
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
