import DisclaimerBadge from './components/DisclaimerBadge.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import TrustSection from './components/TrustSection.jsx';
import PatientJourney from './components/PatientJourney.jsx';
import Testimonials from './components/Testimonials.jsx';
import FAQ from './components/FAQ.jsx';
import ContactCTA from './components/ContactCTA.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#fbfefd] text-slate-950">
      <DisclaimerBadge />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <About />
        <TrustSection />
        <PatientJourney />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
