import Head from 'next/head'
import NewGorilla from '../../components/NewGorilla'
import DashBoardLayout from '../../layout/DashBoardLayout'
export default function Gorillas(){
    return (
        <DashBoardLayout>
            <Head>
        <title>New Gorilla</title>
      </Head>
        <NewGorilla/>
        </DashBoardLayout>
    )
}