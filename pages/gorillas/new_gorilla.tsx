import Head from 'next/head'
import NewGorilla from '../../components/NewGorilla'
import { Fragment } from 'react'
import DashBoardLayout from '../../layout/DashBoardLayout'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Gorillas(){
    return (
        <Fragment>
            <Head>
        <title>New Gorilla</title>
      </Head>
      <ProtectedLayout>
        <DashBoardLayout>
        <NewGorilla/>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>    
    )
}