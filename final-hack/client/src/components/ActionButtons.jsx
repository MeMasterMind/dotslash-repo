import React, { useState, useRef } from 'react'
import { MessageSquare, Users, Upload, Loader2, ChevronDown, ChevronUp, X } from 'lucide-react'

function ActionButtons({setAppStatus}) {
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [data, setData] = useState([])
  const [expandedItems, setExpandedItems] = useState([])
  const [modalData, setModalData] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setUploading(true)
      setUploadSuccess(false)
      setData([])

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          setData(result)
          setUploadSuccess(true)
          setAppStatus('inactive') 
          console.log('File uploaded successfully')
        } else {
          console.error('File upload failed')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setUploading(false)
      }
    } else {
      alert('Please select a valid CSV file')
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const toggleExpand = (index) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const openModal = (item) => {
    setModalData(item)
  }

  const closeModal = () => {
    setModalData(null)
  }

  const handleRedirect = () => {
    window.location.href = "http://localhost:6969"
  }

  return (
    <>
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={handleRedirect} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2">
            <MessageSquare className="w-6 h-6" />
            <span>Chatbot</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2">
            <Users className="w-6 h-6" />
            <span>Human Assistance</span>
          </button>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className={`w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
              <span>{uploading ? 'Working...' : 'Upload CSV'}</span>
            </button>
            {uploadSuccess && (
              <div className="absolute top-full left-0 right-0 mt-2 text-center text-green-500 font-semibold">
                Upload successful!
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="text-center text-gray-400 my-4">--- OR ---</div>

      {data.length > 0 && (
        
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Anomalies Detected </h2>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(index)}>
                  <h3 className="text-lg font-semibold text-white">Transaction {index + 1}</h3>
                  {expandedItems.includes(index) ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
                </div>
                {expandedItems.includes(index) && (
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-300">Date: {`${item.Year}-${item.Month}-${item.Day}`}</p>
                    <p className="text-gray-300">Amount: ${Math.abs(item.Amount)}</p>
                    <p className="text-gray-300">Merchant: {item["Merchant Name"]}</p>
                    <p className="text-gray-300">Anomaly Score: {item.anomaly_score}</p>
                    <button 
                      onClick={() => openModal(item)} 
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2">
              {Object.entries(modalData).map(([key, value]) => (
                <p key={key} className="text-gray-300">
                  <span className="font-semibold">{key}:</span> {
                    typeof value === 'object' ? JSON.stringify(value, null, 2) : value
                  }
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActionButtons

