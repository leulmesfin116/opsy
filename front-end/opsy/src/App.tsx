import { useState } from 'react';
import Home from "./assets/Home.tsx";
import Confirm from "./assets/Confirm.tsx";
import Career from "./assets/Career.tsx";

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return <Career onBack={() => setIsConfirmed(false)} />;
  }

  if (phoneNumber) {
    return <Confirm 
      phoneNumber={phoneNumber} 
      onBack={() => setPhoneNumber(null)} 
      onConfirm={() => setIsConfirmed(true)} 
    />;
  }

  return (
    <>
      <Home onSubmitPhoneNumber={setPhoneNumber} />
    </>
  );
}

export default App;
