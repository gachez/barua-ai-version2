import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Logo from '@/img/logo-white.png'
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, BanknotesIcon, BoltIcon } from '@heroicons/react/24/outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:'90%',
  bgcolor: 'background.paper',
  border: '2px solid rgba(0,0,0,0.3)',
  boxShadow: 24,
  borderRadius: '8px',
  pt: 2,
  px: 4,
  pb: 3,
};
const steps = [
  { name: 'Upgrade', href: '#', status: 'complete' },
  { name: 'Payment', href: '#', status: 'current' },
]
export default function SubscriptionPaymentModal(props) { 
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '60%'}}>
          <header className="relative border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative flex justify-end sm:justify-center">
              <Link href="#" className="absolute left-0 top-1/2 -mt-4 flex">
                <span className="sr-only">Barua AI</span>
                <Image
                  src={Logo}
                  alt="Barua AI logo"
                  height={24}
                  width={24}
                />
              </Link>
              <nav aria-label="Progress" className="hidden sm:block">
                <ol role="list" className="flex space-x-4">
                  {steps.map((step, stepIdx) => (
                    <li key={step.name} className="flex items-center">
                      {step.status === 'current' ? (
                        <a href={step.href} aria-current="page" className="text-indigo-600">
                          {step.name}
                        </a>
                      ) : (
                        <a href={step.href}>{step.name}</a>
                      )}

                        {stepIdx !== steps.length - 1 ? (
                          <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </nav>
                <p className="sm:hidden">Step 2 of 4</p>
              </div>
            </div>
          </header>
          <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pb-0 pt-4 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                <li className="flex items-start space-x-4 py-6">
                  <div className="flex space-y-1">
                    <BoltIcon width={32} height={32} /> <h3>Premium plan</h3>
                  </div>
                </li>
            </ul>
          </div>
        </section>
          <iframe src={props.paymentURI} title="paymentProcessing" style={{width:'100%',height:'80%'}} />
          </Box>
      </Modal>
    </div>
  );
}