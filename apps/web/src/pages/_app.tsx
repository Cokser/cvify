import React, { ReactNode } from 'react'
import Layout from '../components/layout'

import { AppProps } from 'next/app'
import '../../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    {/* @ts-ignore */}
    <Component {...pageProps} />
  </Layout>
)

export default MyApp
