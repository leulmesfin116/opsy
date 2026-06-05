function Career() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
      <h1 className="text-amber-500 text-6xl md:text-8xl lg:text-9xl font-serif mb-4">
        opsy
      </h1>
      <h2 className="text-2xl md:text-4xl lg:text-6xl text-gray-700 max-w-4xl">
        Tell us about your profession
      </h2>
      <div className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <label className="block text-gray-700 text-left text-sm font-bold mb-2">What is your profession?</label>
        <input 
          type="text"
          placeholder="e.g. Software Engineer"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-lg sm:text-base"
        />
        <button 
          className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg text-lg sm:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Career;
