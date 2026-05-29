import React, { useState } from "react";
import { FONTS } from "./models/constants";
import { Landing } from "./views/Landing";
import { ConstellationView } from "./views/ConstellationView";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      <style>{FONTS}</style>
      {page === "landing" && <Landing onEnter={setPage} />}
      {page === "regret" && <ConstellationView type="regret" onBack={() => setPage("landing")} />}
      {page === "love" && <ConstellationView type="love" onBack={() => setPage("landing")} />}
      {page === "future" && <ConstellationView type="future" onBack={() => setPage("landing")} />}
    </>
  );
}
