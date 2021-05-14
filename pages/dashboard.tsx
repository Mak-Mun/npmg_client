import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'

const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
  ssr: false,
})

export default function DashBoard() {
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ProtectedLayout>
        <DashBoardLayout>
          <div>Hello there</div>
        </DashBoardLayout>
      </ProtectedLayout>
    </Fragment>
  )
}
