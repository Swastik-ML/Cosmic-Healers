import RoleGuard from '../../components/RoleGuard'
export default function StudentHome(){
  return (
    <RoleGuard allowed={['student']}>
      <div>
        <h2 className="text-2xl">Student Home</h2>
        <ul className="mt-4">
          <li>Live classes</li>
          <li>Videos</li>
          <li>Documents</li>
          <li>Profile</li>
        </ul>
      </div>
    </RoleGuard>
  )
}
