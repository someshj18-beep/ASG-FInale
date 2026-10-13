import Link from "next/link";
import Footer from "../components/Footer";
import ContactForm from "../contact/form";

export default function VerificationPage() {
 return <main><header className="site-header"><div className="nav-wrap"><Link href="/" className="brand"><img src="/logo.svg" alt="Arctic Staffing Global"/></Link><nav><Link href="/#services">Services</Link><Link href="/#about">About</Link><Link href="/verification">Employee Verification</Link><Link className="nav-cta" href="/contact">Contact <span>↗</span></Link></nav></div></header>
 <section className="inner-hero"><div className="eyebrow dark"><span className="eyebrow-dot"></span> EMPLOYEE VERIFICATION</div><h1>Verification,<br/><span>made simple.</span></h1><p>Use this page to submit an employment verification request. For privacy and security, please provide only the information needed to identify the request.</p></section>
 <section className="form-layout"><div className="form-intro"><h2>Request a<br/>verification.</h2><p>Submit your details and our team will review your request. Additional information may be requested where appropriate.</p><div className="form-note"><span>!</span><p>Submitting a request does not guarantee verification. Requests may require identity, authority, or consent checks.</p></div></div><ContactForm mode="verification"/></section><Footer/></main>
}
