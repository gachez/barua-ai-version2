import dynamic from "next/dynamic";

const SuccessPayment = dynamic(() => import("@/components/SuccessPayment"))

export default function PaymentSuccesful(){
    return (
        <>
            <SuccessPayment />
        </>
    )
}