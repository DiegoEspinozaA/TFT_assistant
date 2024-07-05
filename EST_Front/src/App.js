
import { useEffect, useState } from "react";
import HoneycombBoard from "./components/HoneycombBoard";
import Voice from "./voice_detection/Voice";
import Champions_splash from "./components/Champions_splash";
import RecommendedCompositions from "./components/RecommendedCompositions";
import Shop from "./components/Shop";
function App() {
  return (
    <div className="bg-[#151515] p-10 ">
      <div className="border border-zinc-800  bg-dots-pattern">
        <header className="text-white py-4  mb-10 px-[10%]">
          <div className="flex justify-between font-semibold text-sm">
            <h1>ESTRATEGO</h1>
           
          </div>
        </header>
        <div className="max-w-4xl mx-auto space-y-10">
          <RecommendedCompositions >  </RecommendedCompositions>
          <HoneycombBoard />
          <Shop></Shop>
          <Voice></Voice>
        </div>
      </div>
    </div>
  );
}

export default App;
