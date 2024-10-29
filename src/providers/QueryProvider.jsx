import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "configs/reactQuery";

function QueryProvider({ children }) {
  const queryClient = new QueryClient({ defaultOptions });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
