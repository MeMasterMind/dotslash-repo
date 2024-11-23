function UserInfo({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section className="mb-8 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {user.displayName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">{user.displayName}</h2>
          <p className="text-gray-400">Google Account Owner</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Account Information</h2>
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400">Member since: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-4 border-4 border-dotted border-green-500">
          <h2 className="text-xl font-semibold mb-2">Account Status</h2>
          <p className="text-gray-400">Active</p>
          <p className="text-gray-400">Last login: Today at 9:30 AM</p>
        </div>
      </div>
    </section>
  );
}

export default UserInfo;
