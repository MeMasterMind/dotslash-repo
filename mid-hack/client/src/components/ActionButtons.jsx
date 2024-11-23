import { MessageSquare, Users, Upload } from 'lucide-react'

function ActionButtons() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2">
          <MessageSquare className="w-6 h-6" />
          <span>Chatbot</span>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2">
          <Users className="w-6 h-6" />
          <span>Human Assistance</span>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2">
          <Upload className="w-6 h-6" />
          <span>Upload Record</span>
        </button>
      </div>
    </section>
  )
}

export default ActionButtons

