import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp'),
  { ssr: false }
)

const SuccessPayment = dynamic(() => import("@/components/SuccessPayment"))

export default function PaymentSuccesful(){
    return (
        <>
            <SuccessPayment />
            <CrispWithNoSSR />
        </>
    )
}