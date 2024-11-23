import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import UserInfo from './UserInfo'
import ActionButtons from './ActionButtons'
import CsvUpload from './CsvUpload'
import Footer from './Footer'

function Dashboard({user}) {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar user={user} />
      <main className="flex-grow p-6">
        {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}
        <ActionButtons />
        <CsvUpload />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard

