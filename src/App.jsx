import Home from "./components/HomePage/Home";
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div className="flex flex-col max-w-[700px] h-screen items-center m-auto relative">
      <Home />
      <div className="absolute bottom-0 left-0 w-[100%]">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
