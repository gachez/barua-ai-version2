import '@/styles/globals.css'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(3312000, 6)
  })
  return <Component {...pageProps} />
}
