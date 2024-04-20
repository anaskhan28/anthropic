import { LandingPage } from '@/components/component/landing-page';
import { Navbar } from '@/components/component/navbar';
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <Navbar />
    <LandingPage />
    </>
  )
};


export default page;
