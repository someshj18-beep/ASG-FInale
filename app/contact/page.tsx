import Link from "next/link";
import Footer from "../components/Footer";
import ContactForm from "./form";

export default function ContactPage() {
  return <main><header className="site-header"><div className="nav-wrap"><Link href="/" className="brand"><img src="/logo.svg" alt="Arctic Staffing Global"/></Link><nav><Link href="/#services">Services</Link><Link href="/#about">About</Link><Link href="/verification">Employee Verification</Link><Link className="nav-cta" href="/contact">Contact <span>↗</span></Link></nav></div></header>
    <section className="inner-hero"><div className="eyebrow dark"><span className="eyebrow-dot"></span> CONTACT</div><h1>Let’s start a<br/><span>conversation.</span></h1><p>Tell us a little about what you need. Our team will review your message and follow up.</p></section>
    <section className="form-layout"><div className="form-intro"><h2>How can we<br/>help you?</h2><p>Hiring, outsourcing, IT talent, or a general enquiry—we’re ready to listen.</p><div className="form-note"><span>↗</span><p>Every enquiry is handled with care and directed to the appropriate team.</p></div></div><ContactForm mode="contact"/></section><Footer/></main>
}
