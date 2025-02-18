import IndexDBProvider from "./indexDB/db";
import MainPage from "./pages/main";

function App() {
  return (
    <IndexDBProvider>
      <MainPage></MainPage>
    </IndexDBProvider>
  );
}

export default App;
