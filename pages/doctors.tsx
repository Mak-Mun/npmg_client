import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
export default function Doctors(){
    return(
        <DashBoardLayout>
             <Head>
    <title>Doctors</title>
  </Head>
        <div>Hello there</div>
        </DashBoardLayout>
    )
}