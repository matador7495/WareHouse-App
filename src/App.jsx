import QueryProvider from "providers/QueryProvider";
import Router from "router/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryProvider>
      <Router />
      <Toaster />
    </QueryProvider>
  );
}

export default App;
