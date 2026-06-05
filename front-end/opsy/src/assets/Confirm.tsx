function Confirm({ phoneNumber, onBack }: { phoneNumber: string, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
      <h1 className="text-amber-500 text-6xl md:text-8xl lg:text-9xl font-serif mb-4">
        opsy
      </h1>
      <h2 className="text-2xl md:text-4xl lg:text-6xl text-gray-700 max-w-4xl">
        Confirm your phone number
      </h2>
      <div className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <label className="block text-gray-700 text-left text-sm font-bold mb-2">Enter the code</label>
        <input 
          type="text"
          placeholder="Code"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-lg sm:text-base"
        />
        <button 
          className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg text-lg sm:text-base"
        >
          Confirm
        </button>
        <div className="mt-6 text-gray-600 text-sm">
          Didn't get a code for <span className="font-bold text-gray-800">{phoneNumber}</span>?
        </div>
        <button 
          onClick={onBack}
          className="mt-2 text-amber-500 hover:text-amber-600 font-bold text-sm transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default Confirm;