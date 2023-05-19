import FeatureVid from '@/img/finetune.gif'
import Image from 'next/image'


export default function Feature3Section() {
  return (
    <div id="features" className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Fine-Tune Your Emails for That Personal Touch</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Want to add a personal touch to your AI-generated emails? With our fine-tune feature, you can tweak your messages as needed, ensuring they perfectly align with your unique business communication style. It's your message, your way!
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
