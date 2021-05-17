import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import GorillasC from '../../components/Gorillas'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Gorillas(){
    return(
        <Fragment>
            <Head>
        <title>All Gorillas</title>
      </Head>
      <ProtectedLayout>
        <DashBoardLayout>
        <GorillasC/>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>    
    )
}