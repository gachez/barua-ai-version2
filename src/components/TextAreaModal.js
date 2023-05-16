import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import TextArea from './TextArea'
import { LinearProgress, Alert } from '@mui/material'

export default function TextAreaModal(props) {

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as="div"
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
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {
                props.loadingBar
                ?
                <LinearProgress />
                :
                null
              }
              {
                props.showAlert
                ?
                <Alert style={{zIndex: 99}} severity={props.alertSeverity}>{props.alertText}</Alert>
                :
                null
              }
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg w-[200%] bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                    <TextArea setInstruction={props.setInstruction} instruction={props.instruction} setNewOffer={props.setNewOffer} offerName={props.offerName} setOfferName={props.setOfferName} type={props.type} />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {
                      e.preventDefault()
                      if(props.newOffer === '' || props.instruction === '' ){
                        props.setShowAlert(true)
                        props.setAlertSeverity('error')
                        props.setAlertText('Please fill field before submtting')
                        props.closeAlert()
                        return
                      }
                      props.type === "tune" ? props.improveEmail() : props.saveOffer()
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="inline-flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => props.setOpen(false)}
                  >
                    Close
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
