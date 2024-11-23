import Navbar from './Navbar'
import UserInfo from './UserInfo'
import ActionButtons from './ActionButtons'
import CsvUpload from './CsvUpload'
import Footer from './Footer'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <UserInfo />
        <ActionButtons />
        <CsvUpload />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard

