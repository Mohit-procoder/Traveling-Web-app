
const MoodboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Travel Moodboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for moodboard content */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800">Inspiration Board</h3>
          <p className="text-gray-600 mt-2">Create your travel inspiration board here</p>
        </div>
      </div>
    </div>
  );
};

export default MoodboardPage;