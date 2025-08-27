import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./pages/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <header className="App-header"> */}
        <h1>BrahmvedaEats</h1>
        <Chat />
        {/* </header> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
