import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CreditOptions from './CreditOptions'
import {BanknotesIcon} from '@heroicons/react/20/solid'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase.config';
import { getSignedInUserCookie } from '@/utils'

const plans = [
  { name: 'Starter Bundle', description: "You'll receive 100 credits, giving you the freedom to explore our AI tool and discover its potential.", price: '$10' },
  { name: 'Growth Bundle', description: 'Our Growth Bundle gives you 500 credits, providing the fuel you need to expand your outreach and grow your audience.', price: '$50' },
  { name: 'Pro Bundle', description: "For the seasoned professionals out there, we have the Pro Bundle. You'll get 1,000 credits - perfect for those ready to take their digital communication strategy to the next level.", price: '$100' },
  { name: 'Elite Bundle', description: "This package offers a whopping 2,000 credits, providing the best value and enabling you to fully leverage the power of Barua AI.", price: '$200' },
]

export default function BuyCreditsModal(props) {

  const [selected, setSelected] = useState(plans[0])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const cancelButtonRef = useRef(null)

  async function makeOrder (details){
    try {
        const docRef = await addDoc(collection(db, "orders"), details)
        console.log("Order created with ID: ", docRef.id)
      } catch (e) {
        console.error("Error adding order: ", e)
      }
    }

    function determineAmount(val,numCredits){
        if(val === 'standard'){
            return 15
        }
        if(val === 'premium'){
            return 50
        }
        return numCredits * 0.1
    }

     function startPayment(numOfCredits,subscription=false,subscriptionType='custom'){
      setOpen(true)
      setOpenPM(false)
      setBackdropText('Please wait..')
      setCredtsT(numOfCredits)
      setPaymentURI(setCreditBuy(false))
      setSubscriptionType(subscriptionType)
      const payment = {
        "order":
            {
            "currency": "USD",
            "amount": JSON.parse(selected.price.replace('$', '')),
            "description": "Buy credits",
            "billing_address": {
                "email_address": getSignedInUserCookie(),
                "phone_number": null,
                "country_code": "",
                "first_name": JSON.parse(localStorage.getItem('user')).name,
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
          localStorage.setItem('merchantID',res.data.merchant_reference)
          setShowPaymentModal(true)
          setOpen(true)
          setBackdropText('Please wait..')
          makeOrder({
              merchantID:res.data.merchant_reference,
              amount: determineAmount(subscriptionType,numOfCredits),
              description: 'Buy credits',
              user: getSignedInUserCookie(),
              status: 'incomplete',
              currency: "USD",
              credits:  numOfCredits,
              created:  `${new Date()}`,
              accountNumber: localStorage.getItem('userAccount')
          }).then(() => {
              setOpen(false)
             sendEmail(determineAmount(subscriptionType,numOfCredits),numOfCredits)
              setShowPaymentModal(true)
          })
      })
      .catch(err => {
          console.error(err)
          setSnackbarOpen(true)
      })
      .finally(() => {
          setLinearDisplayPremium('none')
          setOpen(false)
      })
  }
  function sendEmail(amount,credits,){
    axios.post(`${Config.API_URI}/send-mail`,{
        to:getSignedInUserCookie(),
        bcc:"",
        subject:`Order initiated!`,
        message:  returnOrderEmail(JSON.parse(localStorage.getItem('user')).name,amount,localStorage.getItem('userAccount'),credits,'Buy credits','incomplete')
    })
    .then(() => {
        console.log('email sent')
    })
    .catch(err => {
        setSnackbarOpen(true)
    })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BanknotesIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Buy credits
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Each credit costs just $0.1 and equates to one email or DM generation. You only use a credit when you generate a message, so you never have to worry about wasted resources.
                      </p>
                    </div>
                  </div>
                </div><br />
                <CreditOptions plans={plans} selected={selected} setSelected={setSelected} />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                    onClick={() => {
                      console.log('You have selected the ', selected.name)
                    }}
                  >
                    Purchase
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
