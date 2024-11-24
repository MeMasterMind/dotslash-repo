function Navbar({user}) {
    return (
      <nav className="bg-gray-800 p-4 flex items-center justify-between rounded-lg shadow-md">
        <div className="text-xl font-bold"><a href="/">Techtonic</a></div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Analytics</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Settings</a>
        </div>
        <div className="flex items-center">
          <img 
            src={user?.image} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white hover:border-green-500 transition-all transform hover:scale-110"
          />
        </div>
      </nav>
    )
  }
  
  export default Navbar
  