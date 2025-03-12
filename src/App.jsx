import NavBarr from "./components/layout/NavBarr";
import BlockContainer from "./pages/Home/Container";
import ContainerRepair from "./pages/Repair/Container";

function App() {
  return (
    <div className="flex flex-col overflow-auto hide-scrollbar">
      <NavBarr />
      <BlockContainer />
      <ContainerRepair />
    </div>
  );
}

export default App;