import Head from 'next/head'
import DashBoardLayout from '../layout/DashBoardLayout'
export default function Store() {
  return (
    <DashBoardLayout>
      <Head>
    <title>Store</title>
  </Head>
      <div>Hello there</div>
    </DashBoardLayout>
  )
}
