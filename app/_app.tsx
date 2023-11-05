// pages/_app.js
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import * as dotenv from 'dotenv';
import { JetBrains_Mono } from 'next/font/google'
export const jetbrains = JetBrains_Mono({ subsets: ['latin'] })


function MyApp({ Component, pageProps }: AppProps) {
  require('dotenv').config()
  return (
    <ChakraProvider>
      <style jsx global>{`
        html {
          font-family: ${jetbrains.style.fontFamily};
        }
      `}</style>
      
        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;