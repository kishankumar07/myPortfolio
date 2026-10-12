# Production readiness — Kishan T A portfolio

Reviewed on 12 October 2026. Changes are saved locally; nothing has been pushed or deployed.

## Video

The hero retains the full 60-second, 1280 × 720, 30 fps original. Its encoded video stream matches the source exactly, verified by SHA-256 over the video packets. The MP4 was remuxed for fast start without re-encoding. File size is approximately 21 MB. The source is 720p; this work does not create additional detail or claim 1080p/4K quality.

## Performance changes

- Initial JavaScript reduced from approximately 1,291 KB to 408 KB before transfer compression (68% smaller), or approximately 373 KB to 135 KB gzip.
- WebGL libraries and 3D illustrations load only when their sections approach the viewport. No canvases exist on initial hero load.
- Scenes stop rendering offscreen, when the page is hidden, and during mobile scrolling. The hero video pauses offscreen and when the page is hidden.
- Skills auto-rotation stops offscreen, in hidden tabs and for reduced-motion users.
- Removed perpetual footer animation and large unused animation styles. CSS is approximately 138 KB before compression.
- Reused the optimized books model on desktop and mobile, reducing its download from 13.42 MB to 1.66 MB without changing geometry.
- Converted the about-section background to WebP and deferred decorative image loading.
- Hero poster is preloaded; the video begins after the first paint rather than holding up the introduction.
- Added a fallback for unsupported or failed WebGL scenes so the surrounding content and contact form remain usable.

## SEO and usability

- Production build prerenders the portfolio content into HTML and hydrates it in the browser.
- Added a search description, canonical URL, ProfilePage/Person structured data, robots.txt and sitemap.xml.
- Retained the existing canonical domain: https://www.kishanta.in/.
- Added a main landmark and skip link; kept one H1.
- Navigation and hero section links use ordinary anchors and work with keyboards and without JavaScript.
- Mobile navigation has an accessible name and closes after selecting a section.
- Contact fields have associated labels and autocomplete where applicable.
- Theme persistence handles blocked browser storage gracefully.

## Verification

- TypeScript, ESLint, production build, prerender and automated SEO checks pass.
- Tested widths 320, 390, 768, 1024 and 1440 pixels: no horizontal document overflow; one contact form and one H1 at each size; all contact fields labelled.
- Inspected desktop and phone layouts, education models and the contact globe.
- Checked skills grid/orbital switching, mobile navigation, theme persistence, video pause/resume, offscreen rendering states and blank-form validation.
- No browser errors or warnings were recorded in the checked production flows, including dark-theme reload/hydration.
- EmailJS build variables are present. No real email was sent as part of testing.
- Existing three-stdlib dependency emits a build-time warning about its lottie module's eval use. Build succeeds.

## Deploy

Run `npm ci`, then `npm run build`. Deploy the generated `dist` folder with your existing host. The build includes prerender and SEO verification automatically. The development server is not the deployment artifact.

Carry the three existing VITE_EMAILJS_* variables into the host's build environment. Confirm the production domain is allowed in EmailJS, then send one controlled test message after deployment. Do not upload .env as a public file.

Serve HTTPS, compressed JS/CSS/HTML, HTTP byte-range requests for MP4 and appropriate caching. `public/_headers` provides asset caching and basic response headers for hosts that support that convention; otherwise apply equivalent host settings. Keep the canonical URL, sitemap and social URLs consistent if the domain changes.

## Verification limits

Browser viewport tests are not a guarantee for every physical device. No physical iPhone/Android Safari test, throttled-network benchmark, deployed Core Web Vitals measurement, search-engine indexing confirmation or live email-delivery test was performed. The full-quality video is intentionally larger; real playback speed depends on the visitor's connection and production hosting. Finish those checks on the deployed site before treating performance and delivery as universally verified.
