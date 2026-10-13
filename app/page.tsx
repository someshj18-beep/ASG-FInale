import Footer from "./components/Footer";
import Link from "next/link";

const services = [
  { n: "01", title: "Direct Hire", desc: "Find the right people for the roles that move your business forward. We support search, screening, and selection with a people-first approach." },
  { n: "02", title: "Recruitment Process Outsourcing", short: "RPO", desc: "A flexible extension of your talent acquisition function—built to improve hiring consistency, reach, and delivery." },
  { n: "03", title: "Business Process Outsourcing", short: "BPO", desc: "Dependable operational support that helps teams streamline workflows, scale capacity, and stay focused on core priorities." },
  { n: "04", title: "IT Staffing", desc: "Connect with technology talent across key skill sets, from specialist roles to teams supporting your next stage of growth." }
];

export default function Home() {
  return <main>
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brand" aria-label="Arctic Staffing Global home"><img src="/logo.svg" alt="Arctic Staffing Global" /></Link>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a><a href="#about">About</a><Link href="/verification">Employee Verification</Link><Link className="nav-cta" href="/contact">Contact <span>↗</span></Link>
        </nav>
      </div>
    </header>
    <section className="hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="eyebrow"><span className="eyebrow-dot"></span> STAFFING · PEOPLE · OPERATIONS</div>
        <h1>People make<br/>the <span>difference.</span></h1>
        <p className="hero-copy">The right talent. Smarter processes. Stronger outcomes. Arctic Staffing Global helps businesses build teams and deliver work with confidence.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/contact">Let’s work together <span>↗</span></Link><a className="text-link" href="#services">Explore our services <span>↓</span></a></div>
        <div className="hero-foot"><span>PEOPLE FIRST, ALWAYS</span><span className="hero-line"></span><span>BUILT FOR WHAT’S NEXT</span></div>
      </div>
      <div className="hero-side-note">ARCTIC<br/>STAFFING<br/>GLOBAL <span>— 01</span></div>
    </section>
    <section className="trust-strip"><div><span className="strip-mark">✳</span> Talent that fits</div><div><span className="strip-mark">✳</span> Processes that scale</div><div><span className="strip-mark">✳</span> Partnerships that last</div></section>
    <section className="section services" id="services">
      <div className="section-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot"></span> WHAT WE DO</div><h2>Solutions built around<br/>your <span>next move.</span></h2></div><p>Practical, responsive support for the people and processes that keep your business moving.</p></div>
      <div className="service-grid">{services.map(s => <article className="service-card" key={s.n}><div className="service-top"><span>{s.n}</span><span className="service-arrow">↗</span></div><h3>{s.title}</h3><p>{s.desc}</p><Link href="/contact" aria-label={`Enquire about ${s.title}`}>Discuss your needs <span>→</span></Link></article>)}</div>
    </section>
    <section className="about-band" id="about"><div className="about-inner"><div className="eyebrow"><span className="eyebrow-dot"></span> THE ARCTIC APPROACH</div><h2>Good work starts<br/>with <span>good people.</span></h2><div className="about-bottom"><p>We bring a thoughtful, service-led approach to staffing and business support. Our focus is simple: understand what you need, communicate clearly, and build solutions that work in the real world.</p><Link className="button button-light" href="/contact">Start a conversation <span>↗</span></Link></div><div className="about-orbit" aria-hidden="true"><span></span><span></span><span></span></div></div></section>
    <section className="cta-section"><div><div className="eyebrow dark"><span className="eyebrow-dot"></span> READY WHEN YOU ARE</div><h2>Let’s make your next<br/>step a <span>strong one.</span></h2></div><Link className="button button-primary" href="/contact">Get in touch <span>↗</span></Link></section>
    <Footer/>
  </main>
}
