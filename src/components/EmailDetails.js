import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function EmailDetails(props) {
  return (
    <div>
      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          {
            props.type === "email"
            ?
            null
            :
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                {props?.selectedEmail?.name}
              </dd>
            </div>
          }
          {
            props.type === "email"
            ?
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">Target name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{props?.selectedEmail?.targetName}</dd>
          </div>
          : 
          null
          }
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">Offer</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {props?.selectedEmail?.offer}
            </dd>
          </div>
          {
            props.type === "email"
            ?
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white">Prospect description</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                {props?.selectedEmail?.targetCustomer}
              </dd>
            </div>
            :
            null
          }
          {
            props.type === "email"
            ?
              
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                {props?.selectedEmail?.email}
              </dd>
            </div>
            :
            null
          }
          {
            props.type === "template"
            ?
              
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                {props?.selectedEmail?.mood}
              </dd>
            </div>
            :
            null
          }
        </dl>
      </div>
    </div>
  )
}
