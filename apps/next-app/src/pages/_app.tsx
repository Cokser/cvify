import React from 'react'

import { AppProps } from 'next/app'
import '../../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
// @ts-ignore
  <Component {...pageProps} />
)

export default MyApp
