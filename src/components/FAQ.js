const faqs = [
    {
      id: 1,
      question: "What is Barua AI?",
      answer:
        "Barua AI is a cutting-edge tool designed to generate personalized, high-quality sales emails using artificial intelligence. All you need to do is provide your prospect's name, details about your offer, a description of the prospect, and choose the tone of the message. Barua AI then crafts a compelling email that's designed to get responses.",
    },
    {
      id: 2,
      question: "How easy is it to use Barua AI?",
      answer:
        "Using Barua AI is as simple as it gets. Just input a few key details, and our AI does the rest. You don't need any technical expertise or writing skills to generate great sales emails with Barua AI. Plus, with our Basic and Premium plans, you can choose the option that best suits your needs and budget.",
    },
    {
      id: 3,
      question: "What are the Barua AI pricing plans?",
      answer:
        "We offer two plans: Basic and Premium. The Basic plan is free forever and operates on a pay-as-you-go system. You can buy credits, with one credit equivalent to one email generation. The Premium plan costs $39 per month and includes 500 credits each month, access to all features, the ability to save unlimited emails, and add unlimited prospects, along with priority email support.",
    },
    {
      id: 4,
      question: "Can I try Barua AI without committing to a plan?",
      answer:
        "Absolutely! We offer a free trial where you can generate an email without signing up. Plus, when you sign up, you'll receive 100 free credits to see just how effective Barua AI can be for your email outreach.",
    },
  ]
  
  export default function FAQ() {
    return (
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Frequently asked questions</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300">
            Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
            <a href="#" className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300">
              sending us an email
            </a>{' '}
            and we’ll get back to you as soon as we can.
          </p>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base font-semibold leading-7 text-white">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  