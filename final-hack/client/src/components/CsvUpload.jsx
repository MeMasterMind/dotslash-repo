import React, { useState } from 'react'
import { PlusCircle, Trash2, Send } from 'lucide-react'

const initialFormEntry = {
  date: '',
  amount: '',
  time: '',
  use_chip: true,
  merchant_name: '',
  merchant_city: '',
  merchant_state: '',
  zip: '',
  mcc: '',
  errors: 'None'
}

function CsvUpload() {
  const [formEntries, setFormEntries] = useState([initialFormEntry])

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...formEntries]
    updatedEntries[index] = { ...updatedEntries[index], [field]: value }
    setFormEntries(updatedEntries)
  }

  const addNewEntry = () => {
    setFormEntries([...formEntries, initialFormEntry])
  }

  const removeEntry = (index) => {
    const updatedEntries = formEntries.filter((_, i) => i !== index)
    setFormEntries(updatedEntries)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/upload-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEntries),
      })
      if (response.ok) {
        setFormEntries([initialFormEntry])
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="mb-8">
      <div className="bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Multi-Step Form</h2>
        <p className="text-gray-400 mb-4">
          Fill out the form below to submit your data. You can add multiple entries.
        </p>
        <form onSubmit={handleSubmit}>
          {formEntries.map((entry, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">Entry {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`date-${index}`} className="block text-white mb-1">Date</label>
                  <input
                    type="date"
                    id={`date-${index}`}
                    value={entry.date}
                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`amount-${index}`} className="block text-white mb-1">Amount</label>
                  <input
                    type="number"
                    id={`amount-${index}`}
                    value={entry.amount}
                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`time-${index}`} className="block text-white mb-1">Time</label>
                  <input
                    type="time"
                    id={`time-${index}`}
                    value={entry.time}
                    onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`use-chip-${index}`} className="block text-white mb-1">Transaction Type</label>
                  <select
                    id={`use-chip-${index}`}
                    value={entry.use_chip ? 'chip' : 'online'}
                    onChange={(e) => handleInputChange(index, 'use_chip', e.target.value === 'chip')}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                  >
                    <option value="chip">Swipe Transaction</option>
                    <option value="online">Online Transaction</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`merchant-name-${index}`} className="block text-white mb-1">Merchant Name</label>
                  <input
                    type="text"
                    id={`merchant-name-${index}`}
                    value={entry.merchant_name}
                    onChange={(e) => handleInputChange(index, 'merchant_name', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`merchant-city-${index}`} className="block text-white mb-1">Merchant City</label>
                  <input
                    type="text"
                    id={`merchant-city-${index}`}
                    value={entry.merchant_city}
                    onChange={(e) => handleInputChange(index, 'merchant_city', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`merchant-state-${index}`} className="block text-white mb-1">Merchant State</label>
                  <input
                    type="text"
                    id={`merchant-state-${index}`}
                    value={entry.merchant_state}
                    onChange={(e) => handleInputChange(index, 'merchant_state', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`zip-${index}`} className="block text-white mb-1">ZIP Code</label>
                  <input
                    type="text"
                    id={`zip-${index}`}
                    value={entry.zip}
                    onChange={(e) => handleInputChange(index, 'zip', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`mcc-${index}`} className="block text-white mb-1">MCC</label>
                  <input
                    type="text"
                    id={`mcc-${index}`}
                    value={entry.mcc}
                    onChange={(e) => handleInputChange(index, 'mcc', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`errors-${index}`} className="block text-white mb-1">Errors</label>
                  <select
                    id={`errors-${index}`}
                    value={entry.errors}
                    onChange={(e) => handleInputChange(index, 'errors', e.target.value)}
                    className="w-full bg-gray-600 text-white p-2 rounded-md"
                  >
                    <option value="None">None</option>
                    <option value="Technical glitch">Technical glitch</option>
                    <option value="Insufficient Balance">Insufficient Balance</option>
                    <option value="Bad PIN">Bad PIN</option>
                  </select>
                </div>
              </div>
              {formEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Entry</span>
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={addNewEntry}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Entry</span>
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit All Entries</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CsvUpload

