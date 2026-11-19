/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'
import Hostinger from './pages/Hostinger'
import Layout from './components/Layout'

// ONLY IMPORT AND RENDER WORKING PAGES, NEVER ADD PLACEHOLDER COMPONENTS OR PAGES IN THIS FILE
// AVOID REMOVING ANY CONTEXT PROVIDERS FROM THIS FILE (e.g. TooltipProvider, Toaster, Sonner)

// A página utilitária /#/hostinger não faz parte do site de vendas: é um redirect
// de hash para quem acessa via URL com #/hostinger (link do rodapé, favoritos).
function hashToPath() {
  const h = window.location.hash
  if (h.startsWith('#/')) window.location.replace(h.slice(1))
}
hashToPath()

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/hostinger" element={<Hostinger />} />
          {/* ADD ALL CUSTOM ROUTES MUST BE ADDED HERE */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
