import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import Ceremonies from '../components/Kwitizina'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Kwitizina(){
    return(
        <Fragment>
            <Head>
                <title>Kwitizina</title>
            </Head>
            <ProtectedLayout>
        <DashBoardLayout>
        <Ceremonies/>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>
    )
}