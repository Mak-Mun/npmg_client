import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import RangersComponent from '../components/Rangers'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Rangers(){
    return(
        <Fragment>
            <Head>
                <title>Rangers</title>
            </Head>
            <ProtectedLayout>
        <DashBoardLayout>
        <RangersComponent/>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>
    )
}