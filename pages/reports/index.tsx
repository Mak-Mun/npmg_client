import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import ReportsC from '../../components/Reports'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Reports(){
    return(
        <DashBoardLayout>
            <Head>
        <title>All Reports</title>
      </Head>
        <ReportsC/>
        </DashBoardLayout>
    )
}