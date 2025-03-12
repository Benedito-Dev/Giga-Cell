import NavBarr from "./components/NavBarr";
import BlockContainer from "./pages/Home/container";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBarr />
      <BlockContainer />
    </div>
  );
}

export default App;