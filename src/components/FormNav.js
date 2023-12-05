export default function FormNav(props){
    return <nav
    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    aria-label="Pagination"
    >
    <div className="hidden sm:block">
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{props.currentSequenceNumber + 1}</span> of{' '}
        <span className="font-medium">{props.sequenceNumber}</span> results
      </p>
    </div>
    <div className="flex flex-1 justify-between sm:justify-end">
      <span
        onClick={() => {
            if(props.currentSequenceNumber === 0){
                return
            }
            props.setCurrentSequenceIndex(props.currentSequenceNumber - 1)
        }}
        className="relative cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        Previous
      </span>
      <span
        onClick={() => {
            if(props.currentSequenceNumber === (props.sequenceNumber -1)){
                return
            }
            props.setCurrentSequenceIndex(props.currentSequenceNumber + 1)
        }}
        className="relative cursor-pointer ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        Next
      </span>
    </div>
  </nav>

}