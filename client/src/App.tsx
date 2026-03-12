import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import RunsList from "@/pages/runs";
import NewRun from "@/pages/runs/new";
import Invitations from "@/pages/admin/invitations";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/runs" element={<AppLayout><RunsList /></AppLayout>} />
      <Route path="/runs/new" element={<AppLayout><NewRun /></AppLayout>} />
      <Route path="/admin/invitations" element={<AppLayout><Invitations /></AppLayout>} />

      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
