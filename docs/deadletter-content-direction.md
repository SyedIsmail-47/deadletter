# Deadletter — Content & Copywriting Direction

## Voice principles
- Plain verbs, sentence case, no filler. Say what happens, not how the system works internally.
- Active voice always. A button says what it does: "Verify list," not "Submit."
- Keep the same word for the same action everywhere. If a button says "Verify," the result page says "Verified" — never swap in a synonym.
- Errors don't apologize and are never vague. State what happened and what to do next.
- Empty states are an invitation to act, not a mood board.
- "Unknown" is a legitimate, confidently-stated result — never hedge it like a failure on our part.
- Write for a marketing-team buyer who is not technical: explain in plain terms what a result means, not how SMTP works, unless they ask for more detail.

---

## Landing page

**Page `<title>`:** Deadletter — Bulk Email Verification & SMTP Checking
**Meta description:** Verify email lists before you send. Real SMTP checks, honest results, and you only pay for addresses we can actually confirm.

**Hero headline:**
> We tell you what's actually deliverable.

**Hero subheadline:**
> Deadletter checks every address with a real SMTP connection — no guessing from syntax alone. If we can't confirm it, we say so, and you don't pay for it.

**Primary CTA:** Verify your first list — free
**Secondary CTA:** See how it works

**Section — the problem (short, specific, no filler):**
> Bad addresses cost you more than a bounce. They cost you sender reputation. One cleaned list protects every campaign after it.

**Section — differentiation (three short statements, not a feature grid of six+ items):**
> **You only pay for a real answer.** Timeouts and unreachable servers come back as "unknown" — and they're free.
>
> **We catch domains that lie.** Some mail servers accept everything to avoid rejecting real mail. We test for that before calling an address valid.
>
> **We catch servers that lie too.** Some providers reject every unverified address the same way, on purpose. We detect the pattern instead of reporting a false dead end.

---

## Dashboard copy

**Empty state (no jobs yet):**
> Nothing verified yet.
> Upload a list to get your first results in minutes.
> [Verify a list]

**Upload flow:**
> Drop a CSV, or paste emails one per line.
> We'll check each one and sort the results into valid, invalid, risky, disposable, and unknown.

**Job in progress:**
> Checking 1,204 of 3,000 addresses…
> *(real count, not a generic spinner)*

**Job complete:**
> Done. 2,841 confirmed, 93 unknown, 66 removed.
> [Download results] [View breakdown]

**Status label copy (plain-language versions, shown on hover/tooltip over each badge):**
| Status | Plain-language explanation |
|---|---|
| Valid | This address accepted mail and isn't part of a catch-all domain. |
| Invalid | This address was rejected or the domain can't receive mail. |
| Risky | The domain accepts everything, or this is a shared inbox like info@ — deliverable isn't guaranteed. |
| Disposable | A temporary email service. These addresses are rarely worth sending to. |
| Unknown | We couldn't get a confirmed answer — the server didn't respond, or it rejects every check the same way. This isn't a failed check, it's an honest one. We don't charge for it. |

**Billing page:**
> You're on the [Plan name] plan — 10,000 verifications a month.
> 6,214 used this period. Unknown results don't count against this.

**Error — upload failed (specific, no apology):**
> That file couldn't be read. Deadletter accepts CSV or plain text, one email per line or column.

**Error — job failed mid-run:**
> This job stopped at 812 of 3,000. The results so far are saved — download what completed, or restart from where it stopped.

---

## Notification email (job complete)

**Subject:** Your list is verified — 2,841 confirmed

**Body:**
> Your upload of 3,000 addresses is done.
>
> 2,841 valid · 66 invalid · 24 risky · 20 disposable · 93 unknown
>
> Unknown results aren't charged.
>
> [View full results]
