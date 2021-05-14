import dynamic from 'next/dynamic'
import DashBoardLayout from '../layout/DashBoardLayout'

const ProtectedLayout = dynamic(() => import('../layout/ProtectedLayout'), {
  ssr: false,
})

export default function DashBoard() {
  return (
    <ProtectedLayout>
      <DashBoardLayout>
        <div>Hello there</div>
      </DashBoardLayout>
    </ProtectedLayout>
  )
}
