/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function TextArea(props) {
  return (
    <form action="#" className="relative w-full">
      {
        props.type === "tune"
        ?
        null
        :
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <textarea
          onChange={(e) => {
            props.setOfferName(e.target.value)
          }}
          name="Name"
          id="name"
          value={props.edit?props.offerName:props.selectedOffer.name}
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder={"Give your offer a name"}
          defaultValue={''}
        />
      </div>
      }<br />
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <textarea
          onChange={(e) => {
            if(props.type === "tune"){
              props.setInstruction(e.target.value)
              return
            }
            props.setNewOffer(e.target.value)
          }}
          rows={12}
          name="Offer"
          id="offer"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder={props.type === "offer" ? "Write an offer..." : "Add further instructions to customize your message to your preference"}
          value={
            props.edit 
            ? (props.type === "offer" ? props.newOffer : props.instruction)
            : (props.type === "tune" ? props.instruction : props.selectedOffer.offer)
          }
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
