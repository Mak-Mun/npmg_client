import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
import SettingsComponent from '../components/Settings'
export default function Settings(){
    return(
        <DashBoardLayout>
             <Head>
    <title>Settings</title>
  </Head>
        <SettingsComponent/>
        </DashBoardLayout>
    )
}