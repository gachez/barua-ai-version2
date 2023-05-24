import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import FeatureVid from '@/img/baruavid.gif'
import Image from 'next/image'

const features = [
  {
    name: "Provide your prospect&apos;s name",
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
    description: "Help us understand who you&apos;re reaching out to, and we&apos;ll tailor the message to resonate with them.",
    icon: ServerIcon,
  },
  {
    name: 'Choose your tone.',
    description: "Whether you prefer a formal, casual, or friendly tone, we&apos;ve got you covered.",
    icon: ServerIcon,
  },
  
]

export default function FeatureSection() {
  return (
    <div id="features" className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">It&apos;s as Easy as A-B-C</h2>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Craft Personalized Sales Emails with Ease</h1>
              <h1 className="mt-6 text-lg leading-8 text-gray-300">
              Tired of spending hours crafting the perfect sales email? With Barua AI, you just provide a few details and sit back. 
              Our cutting-edge AI tool then whips up a personalized, high-converting sales email designed to resonate with your audience. 
              It&apos;s like having your very own professional copywriter, available 24/7!
              </h1>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
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
