import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Tasks(){
    return(
        <Fragment>
            <Head>
            <title>Tasks</title>
            </Head>
            <ProtectedLayout>
        <DashBoardLayout>
        <div>Hello there</div>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>
    )
}