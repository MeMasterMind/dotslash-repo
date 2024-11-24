import { CheckCircle, XCircle } from 'lucide-react'

function UserInfo({ user, appStatus }) {
  if (!user) {
    return <p className="text-white">Loading...</p>;
  }

  const isActive = appStatus === 'active';

  return (
    <section className="mb-8 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {user.displayName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">{user.displayName}</h2>
          <p className="text-gray-400">Google Account Owner</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">Account Information</h2>
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400">Member since: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div className={`rounded-lg shadow-md p-4 border-2 ${
          isActive ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-white">Transactions Status</h2>
            {isActive ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
          </div>
          <p className={`text-lg font-medium ${isActive ? 'text-green-400' : 'text-red-400'}`}>
          {isActive ? 'All good' : 'Anomalies detected'}
          </p>
          <p className="text-gray-400">{isActive ? 'All cases passed' : 'Some cases failed. check below for details'}</p>
        </div>
      </div>
    </section>
  );
}

export default UserInfo;

