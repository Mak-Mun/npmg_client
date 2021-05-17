import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
import RangersComponent from '../components/Rangers'
export default function Rangers(){
    return(
        <DashBoardLayout>
        <RangersComponent/>
        </DashBoardLayout>
    )
}