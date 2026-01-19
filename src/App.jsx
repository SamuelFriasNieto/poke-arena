import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import TeamBuilderPage from "@/features/team-builder/TeamBuilderPage";
import BattlePage from "@/features/battle/BattlePage";
import NavBar from "@/components/NavBar";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <NavBar />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 font-sans antialiased">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/team-builder" replace />}
                />
                <Route path="/team-builder" element={<TeamBuilderPage />} />
                <Route path="/battle" element={<BattlePage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
