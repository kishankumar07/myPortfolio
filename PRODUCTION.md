# Production readiness audit — 16 October 2026

The current production build was tested locally at http://127.0.0.1:4173/. Nothing has been pushed or deployed.

## Outcome

No release-blocking issue was found in the tested Chrome flows. This is a local production-build audit, not a guarantee for every browser or physical device.

## Fixes made during this audit

- Added a mobile-specific version of the existing planets film: 5,791,140 bytes versus the original 21,014,411 bytes (72.4% smaller). It is the same sequence at 640px wide and 24fps, compressed for phone delivery. The original desktop film is unchanged.
- Verified the mobile browser actually selects `/media/hero-film-mobile.mp4` and decodes it at 640px wide.
- Fixed the experience card's half-width layout at the 768px breakpoint; it now uses the full mobile timeline width.
- Increased the mobile navigation button to a 44px touch target, restored a visible keyboard focus indicator, added Escape-to-close with focus return, and removed its dangling aria-controls reference while closed.
- Expanded `scripts/verify-production.mjs` to check unique IDs, section link targets, language, viewport, social metadata, and the mobile-video size budget.

## SEO and production build

`npm run build` passes TypeScript, Vite, prerendering and the production verification script.

Verified in the generated HTML: one H1, readable prerendered portfolio content, main landmark, description, canonical URL, English document language, responsive viewport, Open Graph and Twitter metadata, ProfilePage/Person structured data, unique IDs and valid section targets. robots.txt and sitemap.xml reference https://www.kishanta.in/.

The host must serve the generated dist directory. The live canonical domain, CDN compression, response headers, search indexing and Search Console were not tested or changed.

## Responsive checks

Tested the production page in Chrome at these viewport sizes:

| Width × height | Result |
| --- | --- |
| 320 × 568 and 320 × 740 | No horizontal document overflow |
| 360 × 800 | No horizontal document overflow |
| 390 × 844 | No horizontal document overflow |
| 430 × 932 | No horizontal document overflow |
| 768 × 1024 | No overflow; experience card uses full available width |
| 800 × 900 | No overflow; career animation enabled |
| 900 × 900 | No overflow; career animation enabled |
| 1024 × 768 | No overflow; career animation enabled |
| 1280 × 800 | No overflow; career animation enabled |
| 1440 × 900 | No overflow; career animation enabled |
| 844 × 390 landscape | No overflow; long pinned animation disabled |

At the ten primary widths, there was one H1, one contact form and no missing section targets. Copyright text remains 16px.

Verified mobile menu open, Escape close, navigation to Contact and empty-form validation. Every contact field has a corresponding label. Verified skills grid/orbital switching, desktop career shortcut landing on the requested role, exit to Education, and education replay.

## Responsiveness and hanging checks

No browser warning, uncaught error or hydration error was recorded during the checked production flows. A saved Coffee theme reload also completed without hydration errors; the test origin was returned to Light afterward.

The initial phone hero had zero WebGL canvases. The planets video was paused when offscreen. The contact scene loaded and rendered when its illustration entered the viewport. SceneCanvas retains its offscreen/hidden-tab rendering controls and mobile scroll pausing.

A roughly 15-second sample covering skills controls and scrolling recorded about 1.59 seconds of main-thread task time, 0.17 seconds of script time, and about 28 MiB of JavaScript heap. These are one local browser sample, not Lighthouse/Core Web Vitals scores, an FPS benchmark or evidence for low-end devices. No input lock or hang was observed in that sample.

Emulated reduced motion: hero entrance animation was disabled, About text and Education entries were fully visible, and Experience pinning was disabled. The emulation was reset.

## Limits / final checks before release

- Physical iPhone/Safari and Android testing remains necessary for device-specific GPU/video behavior. Chrome viewport emulation does not reproduce those engines or hardware.
- The desktop video still downloads the original approximately 21 MB clip. This is a bandwidth consideration, especially on slow connections.
- EmailJS configuration names are present and blank-form validation works. No real email was sent; actual email delivery remains unverified.
- The existing three-stdlib dependency emits a build-time eval warning from its lottie module. It is not a build failure; dependency replacement is outside this audit.
- Hosted redirects, caching headers, social image retrieval by external crawlers and live search indexing require a check after deployment.
