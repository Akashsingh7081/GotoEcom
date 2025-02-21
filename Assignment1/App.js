import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store/store";
import AppNavigator from "./navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
}
