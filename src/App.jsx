import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import PersonasProvider from "./context/PersonasProvider";

function App() {

  return (
    <PersonasProvider>
      <Navbar/>
      <div className="AppBase container">
        <Outlet></Outlet>
      </div>
    </PersonasProvider>
  );
}

export default App;
