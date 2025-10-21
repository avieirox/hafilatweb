import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AbuDhabiBusRoutes from "./pages/AbuDhabiBusRoutes";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BusCardRecharge from "./pages/BusCardRecharge";
import LocationsHafilatRecharge from "./pages/LocationsHafilatRecharge";
import HafilatBalanceOnline from "./pages/HafilatBalanceOnline";


const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/bus-card-recharge" element={<BusCardRecharge />} />
          <Route path="/abu-dhabi-bus-routes" element={<AbuDhabiBusRoutes />} />
          <Route path="/locations-hafilat-recharge" element={<LocationsHafilatRecharge />} />
          <Route path="/hafilat-balance-online" element={<HafilatBalanceOnline />} />
          <Route path="/old" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </TooltipProvider>
);

export default App;
