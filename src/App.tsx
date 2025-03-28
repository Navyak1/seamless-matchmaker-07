
import { useEffect } from "react";
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
  // Enhanced and more aggressive approach to remove the Edit with Lovable button and badge
  useEffect(() => {
    // Function to remove Lovable elements
    const removeLovableElements = () => {
      // Common selectors that might be used for the Lovable badge/button
      const selectors = [
        "#lovable-edit-button",
        ".lovable-edit-button",
        "#lovable-badge",
        ".lovable-badge",
        "[data-lovable-badge]",
        "[class*='lovable']",  // Target any class containing 'lovable'
        "[id*='lovable']",     // Target any id containing 'lovable'
        // Iframe that might contain the badge
        "iframe[src*='lovable']",
        // Additional selectors for better coverage
        "div[style*='position: fixed'][style*='z-index: 999']",
        "div[style*='position: fixed'][style*='bottom: 0']",
        "div[style*='position: fixed'][style*='right: 0']"
      ];
      
      // Try to remove elements matching any of these selectors
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.remove();
        });
      });
      
      // Also check for and remove any fixed positioned elements that might be the badge
      document.querySelectorAll('div[style*="position: fixed"]').forEach(element => {
        if (element.innerHTML?.toLowerCase().includes('lovable') || 
            element.textContent?.toLowerCase().includes('lovable') ||
            element.innerHTML?.includes('edit') ||
            (element.style.bottom === '0px' && element.style.right === '0px') ||
            element.style.zIndex > 900) {
          element.remove();
        }
      });
    };
    
    // Execute removal strategies
    
    // Strategy 1: Remove on initial load
    removeLovableElements();
    
    // Strategy 2: Remove after a short delay (for elements added during/after initial render)
    const timeoutId = setTimeout(removeLovableElements, 200);
    
    // Strategy 3: Set up frequent checks during the first few seconds
    const initialIntervals = [
      setTimeout(() => removeLovableElements(), 500),
      setTimeout(() => removeLovableElements(), 1000),
      setTimeout(() => removeLovableElements(), 2000)
    ];
    
    // Strategy 4: Set up a less frequent interval for ongoing checks
    const intervalId = setInterval(removeLovableElements, 3000);
    
    // Strategy 5: Use MutationObserver to detect when new elements are added
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          removeLovableElements();
          break;
        }
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Clean up when component unmounts
    return () => {
      clearTimeout(timeoutId);
      initialIntervals.forEach(clearTimeout);
      clearInterval(intervalId);
      observer.disconnect();
    };
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
