import Head from 'next/head'
import FamiliesComponent from '../../components/Families'
import DashBoardLayout from '../../layout/DashBoardLayout'
export default function Families(){
    return (
        <DashBoardLayout>
            <Head>
        <title>All Families</title>
      </Head>
        <FamiliesComponent/>
        </DashBoardLayout>
    )
}