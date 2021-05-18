import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import NewReportC from '../../components/NewReport'
import dynamic from 'next/dynamic'
import React from 'react'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function NewReport(){
    return(
        <>
        <Head>
        <title>New Reports</title>
      </Head>
        <ProtectedLayout>
        <DashBoardLayout>
        <NewReportC/>
        </DashBoardLayout>
        </ProtectedLayout>
        </>
    )
}