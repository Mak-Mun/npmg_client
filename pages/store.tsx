import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import dynamic from 'next/dynamic'
const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
    ssr: false,
})
export default function Store() {
  return (
    <Fragment>
      <Head>
    <title>Store</title>
  </Head>
  <ProtectedLayout>
    <DashBoardLayout>
      <div>Hello there</div>
    </DashBoardLayout>
    </ProtectedLayout>
    </Fragment>
  )
}
