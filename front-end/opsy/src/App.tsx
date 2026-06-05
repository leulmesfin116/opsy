import { useState } from 'react';
import Home from "./assets/Home.tsx";
import Confirm from "./assets/Confirm.tsx";

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  if (phoneNumber) {
    return <Confirm phoneNumber={phoneNumber} onBack={() => setPhoneNumber(null)} />;
  }

  return (
    <>
      <Home onSubmitPhoneNumber={setPhoneNumber} />
    </>
  );
}

export default App;
