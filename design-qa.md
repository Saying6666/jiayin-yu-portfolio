# Design QA — 首屏参考布局重排

## Comparison target

- Source visual truth: `/var/folders/j5/p4hsfp9s27xc_2m_tx7mw95r0000gp/T/codex-clipboard-60d89b1e-7e6c-47ba-919d-27acec4173ec.png`
- Final desktop implementation: `/tmp/portfolio-reference-final-cover.png`
- Final side-by-side comparison: `/tmp/portfolio-reference-final-comparison.png`
- Final mobile implementation: `/tmp/portfolio-reference-mobile-final-top.png`
- State: page top, load sequence completed, no dialog or mobile menu open

## Normalization

- Source pixels: 1280 × 720.
- Implementation capture: 1280 × 720 pixels at device pixel ratio 1.
- Browser viewport: 1295 × 796 CSS pixels; document client width 1280 pixels.
- Compared region: the 1280 × 720 `.cover-hero` region below the existing 76-pixel site header.
- Mobile regression viewport: 390 × 844 CSS pixels.

## Full-view comparison evidence

The final comparison shows the same major composition as the reference: focus mark at upper left, portfolio label at upper right, centered single-line editorial title and subtitle, a full-width film strip with the waveform drawn over the images, and a bottom row made from a segmented CTA, hairline, and name.

Focused crops were not needed because the title, mark, film frames, waveform, controls, and footer copy are all readable in the normalized 1280 × 720 comparison.

## Required fidelity surfaces

- Fonts and typography: heavy Song-style serif title retained, with a single centered line on desktop and a controlled two-line wrap on mobile; supporting copy and metadata use lighter sans/mono treatment.
- Spacing and layout rhythm: top metadata, centered title block, film band, and footer align to the reference's four horizontal zones. The film and footer begin at matching vertical positions in the normalized comparison.
- Colors and visual tokens: near-black field, white editorial type, restrained cyan/blue controls, and lime-to-cyan waveform match the reference while staying inside the site's existing blue/green system.
- Image quality and asset fidelity: the film band uses five real portfolio cover frames rather than placeholders. Teal grading and a slight blur unify them with the reference's cinematic treatment.
- Copy and content: title, subtitle, portfolio year, CTA labels, and the name are preserved. The source image's generator watermark is intentionally not reproduced.
- Accessibility and behavior: both CTA links work, the 390-pixel layout has no horizontal overflow, and reduced-motion mode disables entrance, film, grain, and waveform motion while keeping content visible.

## Comparison history

### Pass 1

- Evidence: `/tmp/portfolio-reference-pass-cover.png`
- [P2] Desktop title gap and vertical placement were looser than the reference.
- [P2] Focus mark was underscaled and the surface was visually cleaner than the grainy target.
- Fixes: reduced the inter-title gap, repositioned the title block, enlarged the focus mark, strengthened grain, and tightened the teal film grade.

### Pass 2

- Evidence: `/tmp/portfolio-reference-pass2-cover.png`
- Desktop P2 findings resolved.
- [P2] On 390-pixel mobile, the second half of the segmented CTA did not stretch to fill its grid track.
- Fix: explicitly stretched the scroll action within the mobile CTA group.

### Final pass

- Evidence: `/tmp/portfolio-reference-final-comparison.png` and `/tmp/portfolio-reference-mobile-final-top.png`
- No remaining actionable P0, P1, or P2 findings.
- P3: the reference's long sweeping orbital trail is simplified to the established compact focus mark so the portfolio's own content remains the focal point.

## Interaction and regression checks

- “浏览作品” scrolls to `#archive`.
- Archive groups remain 纪实影像 3、评论写作 11、深度报道 3、编辑排版 3.
- “新媒体设计” remains outside the archive.
- No browser console warnings or errors.
- Production build and TypeScript checks pass.

final result: passed
