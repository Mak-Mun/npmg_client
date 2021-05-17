import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import NewReportC from '../../components/NewReport'
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