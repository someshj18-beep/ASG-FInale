"use client";
import { FormEvent, useState } from "react";

export default function ContactForm({ mode }: { mode: "contact" | "verification" }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setStatus("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, formType: mode }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Unable to send your message.");
      setStatus("Thank you. Your message has been submitted."); form.reset();
    } catch (err) { setStatus(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label><label>Work email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com"/></label></div>
    <div className="form-row"><label>Organisation <span className="optional">(optional)</span><input name="company" autoComplete="organization" placeholder="Company name"/></label><label>{mode === "verification" ? "Employee name" : "I’m interested in"}{mode === "verification" ? <input name="employeeName" required placeholder="Name to verify"/> : <select name="interest" defaultValue="General enquiry"><option>General enquiry</option><option>Direct Hire</option><option>Recruitment Process Outsourcing (RPO)</option><option>Business Process Outsourcing (BPO)</option><option>IT Staffing</option><option>Employee Verification</option><option>Partnership</option></select>}</label></div>
    {mode === "verification" && <div className="form-row"><label>Employee ID <span className="optional">(optional)</span><input name="employeeId" placeholder="Employee ID"/></label><label>Verification purpose<input name="purpose" required placeholder="e.g. Employment history"/></label></div>}
    <label>Message<textarea name="message" required rows={5} placeholder={mode === "verification" ? "Please share the details needed for verification." : "Tell us briefly how we can help."}/></label>
    <label className="consent"><input type="checkbox" required/><span>I confirm that I’m authorised to submit this information and agree to be contacted about this request.</span></label>
    <button className="button button-primary submit-button" type="submit" disabled={busy}>{busy ? "Sending…" : "Submit enquiry"} <span>↗</span></button>
    {status && <p className={status.startsWith("Thank") ? "form-status success" : "form-status"} role="status">{status}</p>}
    <p className="privacy-note">Please do not submit sensitive identity documents or confidential personal information through this form.</p>
  </form>
}
