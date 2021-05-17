import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
import Ceremonies from '../components/Kwitizina'
export default function Kwitizina(){
    return(
        <DashBoardLayout>
        <Ceremonies/>
        </DashBoardLayout>
    )
}