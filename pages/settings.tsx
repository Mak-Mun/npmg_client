import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import SettingsComponent from '../components/Settings'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Settings(){
    return(
        <Fragment>
            <Head>
    <title>Settings</title>
  </Head>
            <ProtectedLayout>
        <DashBoardLayout>
        <SettingsComponent/>
        </DashBoardLayout>
        </ProtectedLayout>
        </Fragment>
    )
}