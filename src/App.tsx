import { useEffect } from "react"; // Import useEffect
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Matchmaking from "./pages/Matchmaking";
import PublicGame from "./pages/PublicGame";
import GameLobby from "./pages/GameLobby";
import Game from "./pages/Game";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const editableButton = document.getElementById("lovable-edit-button");
    if (editableButton) {
      editableButton.remove();
    }
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/public-game" element={<PublicGame />} />
            <Route path="/game-lobby" element={<GameLobby />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

