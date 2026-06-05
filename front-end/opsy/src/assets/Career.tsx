import { useState } from 'react';

function Career({ onBack }: { onBack?: () => void }) {
  const [profession, setProfession] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  return (
    <div className="relative flex flex-col items-center justify-center text-center mt-16 px-4">
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute -top-12 sm:-top-8 md:top-0 left-4 md:left-8 flex items-center text-gray-500 hover:text-amber-500 transition-colors font-bold text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          
        </button>
      )}
      <h1 className="text-amber-500 text-6xl md:text-8xl lg:text-9xl font-serif mb-4">
        opsy
      </h1>
      <h2 className="text-2xl md:text-4xl lg:text-6xl text-gray-700 max-w-4xl">
        Tell us about your profession
      </h2>
      <div className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <label className="block text-gray-700 text-left text-sm font-bold mb-2">What is your profession?</label>
        <select 
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-lg sm:text-base bg-white"
        >
          <option value="" disabled>Select your profession</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Mechanical Engineer">Mechanical Engineer</option>
          <option value="Civil Engineer">Civil Engineer</option>
          <option value="Sales">Sales</option>
          <option value="Accountant">Accountant</option>
          <option value="Video Editor">Video Editor</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Marketing Manager">Marketing Manager</option>
          <option value="Social Media Manager">Social Media Manager</option>
          <option value="Other">Other (Please specify)</option>
        </select>
        
        {profession === "Other" && (
          <input 
            type="text"
            placeholder="Type your profession"
            className="w-full mt-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-lg sm:text-base bg-white"
          />
        )}

        <div className="mt-4 text-left">
          <label className="block text-gray-700 text-sm font-bold mb-2">Work Location</label>
          <select 
            value={workLocation}
            onChange={(e) => setWorkLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-lg sm:text-base bg-white"
          >
            <option value="" disabled>Select work location</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="All">All</option>
          </select>
        </div>

        <button 
          className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg text-lg sm:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Career;
