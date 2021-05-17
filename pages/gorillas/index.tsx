import Head from 'next/head'
import DashBoardLayout from '../../layout/DashBoardLayout'
import GorillasC from '../../components/Gorillas'
export default function Gorillas(){
    return(
        <DashBoardLayout>
            <Head>
        <title>All Gorillas</title>
      </Head>
        <GorillasC/>
        </DashBoardLayout>
    )
}