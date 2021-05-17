import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
export default function Tasks(){
    return(
        <DashBoardLayout>
            <Head>
    <title>Tasks</title>
  </Head>
        <div>Hello there</div>
        </DashBoardLayout>
    )
}