import QueryProvider from "providers/QueryProvider";
import Router from "router/Router";

function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}

export default App;
