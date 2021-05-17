import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import NewReportC from '../../components/NewReport'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../../layout/ProtectedLayout'), {
    ssr: false,
})
export default function NewReport(){
    return(
        <DashBoardLayout>
            <Head>
        <title>New Reports</title>
      </Head>
        <NewReportC/>
        </DashBoardLayout>
    )
}