import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: "Basic Plan",
    id: 'tier-basic',
    href: '#',
    priceMonthly: '$0',
    description: "Our Basic Plan is designed to let you experience the power of Barua AI without any commitment. It's free forever, letting you pay as you go.",
    features: ['Pay as You Go', 'Fine-Tune Feature Access', 'Save Up To 100 Emails', 'Add Up To 100 Prospects'],
  },
  {
    name: 'Premium Plan',
    id: 'tier-premium',
    href: '#',
    priceMonthly: '$39',
    description: "Take your email outreach to the next level with our Premium Plan. Unlock an array of powerful features",
    features: [
      '500 Credits Every Month',
      'Access to All Features',
      'Save Unlimited Emails',
      'Add Unlimited Prospects',
      'Priority Email Support',
    ],
  },
]

export default function Pricing() {
  return (
    <div id="pricing" className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Choose your plan and start crafting compelling, personalized sales emails
          </h1>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
          Whether you're a small business just starting with email marketing or a large enterprise looking to optimize your outreach, Barua AI has a plan for you. Choose from our affordable Basic and Premium plans and start generating compelling sales emails today.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse cx={604} cy={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" rx={604} ry={512} />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3 id={tier.id} className="text-base font-semibold leading-7 text-indigo-600">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                      <span className="text-base font-semibold leading-7 text-gray-600">/month</span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started today
                  </a>
                </div>
              ))}
          
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
