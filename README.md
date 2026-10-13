# Arctic Staffing Global

Premium-minimal, responsive staffing company website built with Next.js App Router, React, TypeScript and CSS.

## Included
- Homepage and service sections: Direct Hire, RPO, BPO and IT Staffing
- Contact enquiry page
- Employee Verification request page
- Responsive mobile styling and supplied logo assets
- Server-side form endpoint routing enquiries to `Menka@arctic-staffing-global.com`
- No public phone number or email address displayed on the site

## Deploy to GitHub and Vercel (no local install needed)
1. Extract this ZIP.
2. Create a GitHub repository and upload the contents of this folder to the repository root.
3. In Vercel, choose **Add New → Project**, import the repository and deploy.
4. Set `RESEND_API_KEY` in **Vercel → Project → Settings → Environment Variables**.
5. Verify a sending domain in Resend, then update the `from` value in `app/api/contact/route.ts` from `website@resend.dev` to an address on that verified domain.
6. Redeploy after saving the environment variable and sender address.
7. In Vercel **Settings → Domains**, add `arctic-staffing-global.com` and follow the DNS instructions shown there.

## Email delivery
Both forms send through Resend's server-side API to `Menka@arctic-staffing-global.com`. The form intentionally reports an error if the email provider is not configured; it does not pretend an email was sent. Production email delivery requires a valid `RESEND_API_KEY` and an approved sender address/domain in Resend.

## Before launch
- Test both forms after configuring Resend.
- Add a privacy policy and any required legal disclosures.
- Do not request or upload identity documents through this basic employee verification form.
- Consider adding rate limiting or CAPTCHA if the forms attract spam.

## Commands
- `npm run dev` — local development
- `npm run build` — production build
- `npm start` — run production build
