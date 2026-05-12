import { HashRouter, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AssistantProvider } from './context/AssistantContext'
import SkipToContent from './components/layout/SkipToContent'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './screens/Home'
import AssistantWelcome from './screens/AssistantWelcome'
import AssistantFlow from './screens/AssistantFlow'
import PaletteRecommendation from './screens/PaletteRecommendation'
import PaintSystemResult from './screens/PaintSystemResult'
import FinalPaintPlan from './screens/FinalPaintPlan'
import Checkout from './screens/Checkout'
import SavedPlan from './screens/SavedPlan'
import InsirasiWarna from './screens/InsirasiWarna'
import AntiBocor from './screens/AntiBocor'
import JasaTukang from './screens/JasaTukang'
import DesignSystem from './screens/DesignSystem'
import NotFound from './screens/NotFound'

// Wrapper that provides stepId param to AssistantFlow
function AssistantFlowWrapper() {
  const { stepId } = useParams<{ stepId: string }>()
  if (!stepId) return <Navigate to="/panduan/mulai/step/1" replace />
  return <AssistantFlow />
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-cream-50">
      <SkipToContent />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AssistantProvider>
        <HashRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/panduan" element={<AssistantWelcome />} />
              <Route path="/panduan/mulai/step/:stepId" element={<AssistantFlowWrapper />} />
              <Route path="/panduan/rekomendasi-warna" element={<PaletteRecommendation />} />
              <Route path="/panduan/sistem-cat" element={<PaintSystemResult />} />
              <Route path="/panduan/rencana-cat" element={<FinalPaintPlan />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/rencana-tersimpan" element={<SavedPlan />} />
              <Route path="/inspirasi-warna" element={<InsirasiWarna />} />
              <Route path="/anti-bocor" element={<AntiBocor />} />
              <Route path="/jasa-tukang" element={<JasaTukang />} />
              <Route path="/design-system" element={<DesignSystem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      </AssistantProvider>
    </LanguageProvider>
  )
}
