import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextArea from './TextArea'
import { LinearProgress, Alert } from '@mui/material'

export default function TextAreaModal(props) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="relative sm:my-auto sm:max-w-sm sm:mx-auto w-full sm:max-w-md">
            {props.loadingBar ? <LinearProgress /> : null}
            {props.showAlert ? (
              <Alert style={{ zIndex: 99 }} severity={props.alertSeverity}>
                {props.alertText}
              </Alert>
            ) : null}
            <div className="bg-white px-4 pb-4 pt-5 text-left shadow-xl rounded-lg sm:rounded-none sm:p-6">
              <div>
                <TextArea
                  setInstruction={props.setInstruction}
                  instruction={props.instruction}
                  setNewOffer={props.setNewOffer}
                  offerName={props.offerName}
                  setOfferName={props.setOfferName}
                  newOffer={props.newOffer}
                  type={props.type}
                  edit={props.edit}
                  selectedOffer={props.selectedOffer}
                />
              </div>
              <div className="mt-5 sm:mt-6 flex flex-col gap-4 sm:flex-row sm:justify-end">
                
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex mt-4 sm:mt-0 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => props.setOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => {
                    e.preventDefault();
                    if (props.newOffer === '' || props.instruction === '') {
                      props.setShowAlert(true);
                      props.setAlertSeverity('error');
                      props.setAlertText('Please fill field before submitting');
                      props.closeAlert();
                      return;
                    }
                    if(props.edit){
                      props.editOffer(props.selectedOffer.id, {name: props.offerName === "" ? props.selectedOffer.name : props.offerName, offer: props.newOffer === "" ? props.selectedOffer.offer : props.newOffer})
                      return
                    }
                    props.type === 'tune' ? props.improveEmail() : props.saveOffer();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
