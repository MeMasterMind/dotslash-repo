import { FileUp } from 'lucide-react'

function CsvUpload() {
  return (
    <section className="mb-8">
      <div className="bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Upload CSV</h2>
        <p className="text-gray-400 mb-4">
          Upload your CSV file to analyze and process your data.
        </p>
        <div className="flex items-center space-x-4">
          <input 
            type="file" 
            accept=".csv" 
            className="bg-gray-700 text-gray-100 p-2 rounded-md flex-grow"
          />
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-2">
            <FileUp className="w-5 h-5" />
            <span>Upload</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CsvUpload

