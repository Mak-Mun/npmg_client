import Head from 'next/head'
import FamiliesComponent from '../../components/Families'
import DashBoardLayout from '../../layout/DashBoardLayout'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Families(){
    return (
        <Fragment>
            <Head>
        <title>All Families</title>
      </Head>
        <DashBoardLayout>
            
      <ProtectedLayout>
        <FamiliesComponent/>
       </ProtectedLayout>
        </DashBoardLayout>
        </Fragment>
    )
}