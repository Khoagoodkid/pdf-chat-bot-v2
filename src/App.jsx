import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
