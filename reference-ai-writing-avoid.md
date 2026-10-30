# Avoid signs of AI writing (product UX copy)

Adapted from [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) for **UI strings, errors, empty states, notifications, help text, and LLM instruction files**. Paste into skills under `## Avoid AI writing` or use as an eval rubric.

**Policy (Cursor + this deck): hard ban.** Do not use any listed word or phrase in copy you ship or in agent-drafted prose. One hit is a fail. OK only in verbatim quotes, labeled `Bad:` examples, or when listing the ban list itself.

**Wikipedia-only sections** (citations, markup, edit summaries, AfC, comment boilerplate) are listed at the end for completeness; skip them for typical UX strings.

Global rule: `~/.cursor/rules/avoid-ai-writing.mdc` (`alwaysApply: true`).

---

## Content

### Undue emphasis on significance, legacy, and broader trends

Avoid in short copy: transformative journey, lasting impact, broader landscape, enduring legacy, on the global stage.

### Canned emphasis on notability, attribution, and media coverage

Industry-leading, widely recognized, has been featured in, garnered attention, notable for (when you are not writing a press release).

### Superficial analyses

Three abstract adjectives instead of one testable fact.

### Promotional and advertisement-like language

Boasts, vibrant, rich tapestry, commitment to excellence, seamlessly integrates, unlock the power of, diverse array, in the heart of, value-driven, showcase.

### Vague expression of connection or association

In connection with, associated with, linked to (without saying how).

### Vague attributions and overgeneralization

Experts say, many believe, it is widely known, some argue.

### Outline-like conclusions about challenges and future prospects

In conclusion, the road ahead, future prospects, remains to be seen (in UI).

### "Awards and recognition" blocks

Bulky award lists in empty states or tooltips (N/A for most UI; common in AI-generated long text).

---

## Language and grammar

### High density of "AI vocabulary" words

**Hard ban (every occurrence):**

additionally, align with, boasts, bolstered, crucial, deep dive, delve, emphasizing, enduring, enhance, enhancing, fostering, garner, highlight (verb), highlighting, interplay, intricate, intricacies, landscape (abstract), meticulously, pivotal, robust, showcase, showcasing, tapestry, testament, underscore (verb), valuable, vibrant, key (filler), challenge (filler), clearer, dependable, echoed, foster, leverage, matters (filler), multifaceted, practical (filler), prioritize, quietly, steady, universally

### Avoidance of basic copulatives ("is"/"are")

Words to watch: serves as, stands as, marks, functions as, operates as, represents, boasts, features, maintains, offers (instead of **has**), refers to (when the subject simply **is** something).

Prefer: **is**, **are**, **has**, **lets you**.

### Negative parallelisms

- Not just X, but (also) Y / Not only X, but Y
- It's not X, it's Y / no X, no Y, just Z
- X rather than Y (especially mid-2026+ "corrective framing")

Write one direct sentence.

### Rule of three

Three adjectives or three parallel noun phrases in a row when fewer would work.

### Leads treating list titles as proper nouns

Mostly Wikipedia lead style; in product, avoid awkward **The Settings Page** when **Settings** is enough.

---

## Style

### Title case

Headlines and buttons in Title Case when your system uses sentence case.

### Overuse of boldface

Bold for decoration, not only for real emphasis.

### Inline-header vertical lists

**Speed:** Fast uploads. **Security:** Encrypted. (Chatbot-shaped; use one line or real list markup in docs only.)

### Heading errors

Title headings, skipped levels, multiple H1s: mostly long-form/docs; still fail evals if pasted into Confluence from AI.

### Emoji as formatting

Emoji bullets or section markers in product copy (especially errors and legal).

### Unusual use of tables

Over-tabulating simple copy in specs (OK if your team uses tables; watch for AI filler rows).

### Curly quotation marks and apostrophes

“Smart quotes” pasted from chat when the product uses straight `"` and `'`.

---

## Communication intended for the user (chatbot leakage)

### Collaborative communication

Words to watch: a Wikipedia-style article, I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like…, is there anything else, let me know, more detailed breakdown, here is a…, check/verify/confirm before publishing.

Never in shipped strings.

### Hedging disclaimers

While specific details are limited/scarce, not widely available/documented, in the provided/available sources, should be treated/presented as X rather than Y, based on available information, does not by itself establish, important to note, maintains a low profile.

### Phrasal templates and placeholder text

[Insert name], [Your company here], lorem-style brackets, unfinished cutoffs, HTML/Markdown comments meant for the author left in output.

---

## Markup irregularities (Wikipedia / long-form)

Broken wikilinks, odd ref tags, duplicate ref names: N/A for UI; flag when AI paste lands in docs.

---

## Citations (Wikipedia-only)

Broken external links, invalid DOI/ISBN, unrelated DOI targets, book cites without pages, utm_source= on links, named refs unused in body, citation overemphasis in talk pages.

---

## Comment-specific indicators, edit summaries, AfC (Wikipedia-only)

Canned policy assurances, "preserved/retained information", AfC review mentions, submission statements, pre-placed maintenance templates, permissions gaming boilerplate.

---

## Miscellaneous

### Pronounced shift in writing style

One string in a totally different voice than the rest of the flow.

### Differences between LLMs

Grok-leaning "scientific" words (empirical, causal) still rare in enterprise UX; know your tool's tics.

### Biases in content

Pro-authoritarian or other content biases: relevant for generated **help articles**, not button labels.

---

## Eval tip

Add a rubric row: **Sounds like AI writing** (pass = zero banned tokens from this file in the string). Source: Wikipedia link at top.

## Ineffective / historical indicators (weak alone)

Perfect grammar, em dashes, knowledge cutoff apologies, section-summary paragraphs. Still apply the hard ban list above for evals.
