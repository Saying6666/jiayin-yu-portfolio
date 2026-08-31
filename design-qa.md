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

The orbit mark required a focused 640 × 460 comparison. Evidence: source `/tmp/reference-orbit-crop.png`, implementation `/tmp/orbit-final-crop.png`, and side-by-side comparison `/tmp/orbit-final-comparison.png`.

## Required fidelity surfaces

- Fonts and typography: heavy Song-style serif title retained, with a single centered line on desktop and a controlled two-line wrap on mobile; supporting copy and metadata use lighter sans/mono treatment.
- Spacing and layout rhythm: top metadata, centered title block, film band, and footer align to the reference's four horizontal zones. The film and footer begin at matching vertical positions in the normalized comparison.
- Colors and visual tokens: near-black field, white editorial type, restrained cyan/blue controls, and lime-to-cyan waveform match the reference while staying inside the site's existing blue/green system.
- Image quality and asset fidelity: the film band uses five real portfolio cover frames rather than placeholders. Teal grading and a slight blur unify them with the reference's cinematic treatment.
- Copy and content: title, subtitle, portfolio year, CTA labels, and the name are preserved. The source image's generator watermark is intentionally not reproduced.
- Accessibility and behavior: both CTA links work, the 390-pixel layout has no horizontal overflow, and reduced-motion mode disables entrance, film, grain, waveform, orbit, node, and ring motion while keeping content visible.

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

### Orbit strict-reference pass

- Evidence: `/tmp/orbit-final-comparison.png` and `/tmp/orbit-mobile-final.png`.
- Source and implementation use the same 640 × 460 coordinate space at device pixel ratio 1.
- The final mark matches the source's circle center, 45-pixel outer ring, 27-pixel inner ring, central lime point, lower hook, three luminous nodes, and the two dashed paths meeting at the second node.
- Motion preserves the source geometry: the rings rotate in opposite directions, dashes flow along the paths, and point scaling stays within a subtle 0.96–1.08 range.
- No remaining actionable P0, P1, or P2 findings.

## Interaction and regression checks

- “浏览作品” scrolls to `#archive`.
- Archive groups remain 纪实影像 3、评论写作 11、深度报道 3、编辑排版 3.
- “新媒体设计” remains outside the archive.
- No browser console warnings or errors.
- Production build and TypeScript checks pass.

final result: passed

# Design QA — 2026-08-31 结尾页分层与缓动

## Source and scope

- Brief: `/Users/wenjiayi1/Library/Containers/com.tencent.qq/Data/Downloads/结尾部分修改 (1).docx`.
- Source visual truth: `/tmp/codex-portfolio-ending.yPcFAu/image1.jpeg` (1106 × 621).
- Modified surface: `src/components/AboutFooter.tsx` and the ending-page block of `src/styles.css` only. Existing contact values, archive content, first screen, routes, and source documents are preserved.
- New asset: `public/assets/visuals/contact-hero-clean.webp` (2112 × 745, 230658 bytes), made with built-in Image Gen and converted to WebP. The original reference remains available for the quotation mark and photographic particle samples.
- Local preview: `http://127.0.0.1:4174/#about`. No commit, push, or deployment performed for this change.

## Evidence and normalization

- Desktop viewport: 1121 × 850 CSS pixels, document width 1106, devicePixelRatio 1. The browser screenshot exporter produced 1106 × 839 pixels; normalized to the CSS viewport before cropping the footer to 1106 × 634. The reference was not stretched: its 13-pixel shorter contact area is padded below for comparison.
- Final desktop: `/tmp/codex-portfolio-ending.yPcFAu/desktop-final.png`.
- Full-view side-by-side: `/tmp/codex-portfolio-ending.yPcFAu/comparison-final.png`.
- Focused quotation/headline comparison: `/tmp/codex-portfolio-ending.yPcFAu/type-comparison-final.png`.
- Mobile viewport: 390 × 844 CSS pixels (document width 375 with scrollbar), devicePixelRatio 1. Evidence: `/tmp/codex-portfolio-ending.yPcFAu/mobile-final.jpg` and `/tmp/codex-portfolio-ending.yPcFAu/mobile-contact-final.jpg`.
- State: `#about`, no menu/dialog, background animation enabled. Additional states tested: pause/resume, reduced motion, offscreen, mobile navigation, footer-to-top navigation.

## Fidelity surfaces and comparison history

- Typography: the two-line headline is real, selectable HTML in Songti SC / serif fallback; 52.2px at 1106px content width. Copy and green full stop match the reference. It is not baked into the background and has no entrance or looping animation.
- Layout: same left editorial statement/right camera composition. The contact area keeps four correctly mapped real fields, rather than the mismatched illustrative numbers in the source image. Mobile puts the lens above readable type and stacks contacts without vertical border remnants.
- Colors: near-black/green backdrop, restrained teal/gold optical lighting, white headline and muted yellow-green accents retained. Contact backing is a quieter solid near-black, an intentional minor simplification.
- Images: main lens/collage uses the generated raster, not a CSS/SVG recreation. Motion is masked sampling of that same raster; the lens body itself is still. The generated lens center differs vertically by roughly 1% of the hero height, a minor accepted image-generation variation.
- Copy: title, name, school, WeChat, email and update year preserve the live site's existing values. Reference-image watermark and sample phone numbers are not reproduced.
- Pass 1: the generic quotation icon differed from the source and the headline was slightly undersized (P2). Replaced it with the reference's actual bitmap quotation and adjusted title size/line-height.
- Pass 2: source quotation crop showed a faint rectangular backing (P2). Added restrained contrast and screen compositing to remove the patch without redrawing the quotation.
- Final pass: full-view and focused comparisons above show those findings resolved; mobile rechecked after the quote update. No actionable P0/P1/P2 findings remain. Minor raster grain/font-rendering differences are P3, not pixel-perfect equivalence.

## Checks and interaction proof

| Check | Result |
| --- | --- |
| Correct URL and page identity | Passed: `#about`, 贾银玉｜新闻传播作品集 |
| Meaningful content / no blank page | Passed: headline and all four contacts visible |
| Framework error overlay | None |
| Browser console warnings/errors | None in final check |
| Desktop and mobile screenshots | Captured and visually compared |
| Background-only motion | All 24 effect layers changed while every sampled text bounding box, transform and animation stayed identical |
| Pause/resume | Toggle sets aria-pressed, all 24 layers pause with stable transforms, then resume |
| Reduced motion | Emulated preference disables all 24 animations, hides drifting particles, preserves text; emulation restored afterward |
| Offscreen behavior | Returning to top pauses footer motion |
| Contact/readability | All values present; email href is `mailto:jiayinyu_cqu@163.com` |
| Top navigation | Click “回到顶部” → `#top`, verified scrollY = 0 |
| Mobile navigation | 菜单 → 02 关于 → menu closes and footer is reached |
| Footer horizontal bounds | Footer scrollWidth equals clientWidth (1106 desktop / 375 mobile); horizontal swipe leaves scrollX = 0 |
| TypeScript / production build / diff whitespace | Passed: `pnpm typecheck`, `pnpm build`, `git diff --check` |

The whole-page DOM reports small overflow from existing archive/new-media decoration outside this task; the changed footer is contained and horizontal swiping does not shift the page. No unrelated layout rewrite was made. Browser validation used the in-app Browser; no fallback browser. Safari/Firefox, physical phones and production deployment were not tested in this local pass.

## Asset generation prompt

Built-in Image Gen, edit target: `public/assets/visuals/contact-hero-reference.jpg`. Generated original: `/Users/wenjiayi1/.codex/generated_images/01a05600-be4a-70d1-b3d4-2ac848c80549/exec-ee2abff5-3666-4fb0-9e39-beaf8dd93ecb.png`.

> Use case: precise-object-edit. Asset type: high-resolution textless website footer hero background. Image 1 is the sole edit target. This is a surgical inpainting cleanup, not a new image and not a redesign.
>
> Remove ONLY the large white Chinese headline on the left and the outlined quotation-mark symbol above it. Reconstruct that left area with the same near-black/deep-green fine grain and subtle texture from the adjacent background. The finished image must have no text or quotation marks anywhere.
>
> Preservation lock: keep the source image's full wide framing, 1106:390 aspect ratio, camera lens position, size, perspective, crop, lighting, colors, and all right-side pixels/objects unchanged. The lens center must remain at about x=762/1106, y=225/390. Preserve every thin copper/yellow/lime concentric ring, aperture blade, cyan/gold glow, newspaper/newsprint texture, film strip, and typewriter keyboard detail exactly in place. Keep the left side mostly empty and dark after removal. Do not shift, enlarge, shrink, recenter, regenerate, or restyle the lens or collage; do not alter the right half. No UI, footer copy, labels, logo, watermark, invented objects, extra graphics, or crop.
>
> Output one high-quality raster at approximately 3318x1170 or another high resolution with exactly the same 1106:390 ratio. Match the original photographic/editorial grain and sharpness. Change only the two specified left text elements and their immediate underlying pixels.

final result: passed
