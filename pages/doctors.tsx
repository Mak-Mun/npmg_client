import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Doctors(){
    return(
        <Fragment>
            <Head>
               <title>Doctors</title>
            </Head>
        <DashBoardLayout>
        <ProtectedLayout>
        <div>Hello there</div>
        </ProtectedLayout>
        </DashBoardLayout>
        </Fragment>     
    )
}