import { Switch, Route } from "wouter";
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
    <Switch>
      <Route path="/login" component={Login} />
      
      <Route path="/">
        <AppLayout><Dashboard /></AppLayout>
      </Route>
      <Route path="/runs">
        <AppLayout><RunsList /></AppLayout>
      </Route>
      <Route path="/runs/new">
        <AppLayout><NewRun /></AppLayout>
      </Route>
      <Route path="/admin/invitations">
        <AppLayout><Invitations /></AppLayout>
      </Route>

      <Route>
        <AppLayout><NotFound /></AppLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
