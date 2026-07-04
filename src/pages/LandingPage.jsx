import Header from '../components/Header'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import Differentials from '../components/Differentials'
import PlansSection from '../components/PlansSection'
import AudienceSections from '../components/AudienceSections'
import LegalTeamSection from '../components/LegalTeamSection'
import HowItWorks from '../components/HowItWorks'
import DashboardMockup from '../components/DashboardMockup'
import InnovationSection from '../components/InnovationSection'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import WhatsappFloat from '../components/WhatsappFloat'

// Landing page pública — não exige autenticação.
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Differentials />
        <PlansSection />
        <AudienceSections />
        <LegalTeamSection />
        <HowItWorks />
        <DashboardMockup />
        <InnovationSection />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <WhatsappFloat />
    </div>
  )
}
