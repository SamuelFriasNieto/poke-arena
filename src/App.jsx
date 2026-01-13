import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TeamBuilder from './features/team-builder/TeamBuilder';
import Battle from './features/battle/Battle';
import NavBar from './components/NavBar';

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <NavBar />

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 font-sans antialiased">
            <Routes>
              <Route path="/" element={<Navigate to="/team-builder" replace />} />
              <Route path="/team-builder" element={<TeamBuilder />} />
              <Route path="/battle" element={<Battle />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
