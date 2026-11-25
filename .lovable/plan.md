# Persistent career report history and deployment safety

## What will change
- Replace demo-only sign-in with real Cloud Auth accounts so report history follows a person across sessions. Keep the existing email/password flow; email confirmation remains on.
- Save each successfully generated report and its form answers to a private history owned by the signed-in account. Add a history view that opens previous reports.
- Keep report generation on the secure server. By default, continue using the existing privately managed Gemini connection; only use a separate Google AI key if selected below.
- Change only the footer wording requested: `CareerAI · AI Career Guidance System`.

## Data and privacy
- Store report records with a stable account ID, submitted answers, generated result, and creation time.
- Add owner-scoped read/write policies so signed-in people can only access their own report records; do not accept an owner ID from the browser.
- Do not add a separate profile table unless requested. Existing demo sign-ins are not real accounts, and previous in-memory reports cannot be recovered.

## Technical details
- Use a Cloud database migration with explicit grants and row-level security; use authenticated TanStack server functions for report generation and history reads.
- Enable email/password auth before adding its calls. Keep credentials out of browser-visible variables and source files.
- If a separate Google AI Studio key is chosen, store it as a private server setting and read it only inside the server function. Otherwise keep the existing managed key.
- Verify the account flow, saved-report return path, owner isolation, footer text, and deployment build.