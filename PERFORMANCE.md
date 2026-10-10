# Mobile rendering performance

Changes are isolated on `codex/mobile-performance`, based on the original portfolio (`97b2dab`). No deployment or push has been performed.

## Findings

- Hero, education and contact each used an always-running WebGL canvas, even offscreen.
- Hero and education used ContactShadows with its default infinite frame count. Each update renders the scene to a shadow target and performs multiple blur passes.
- Cube, React logo and snowflake used infinite GSAP tweens without cleanup, independent of canvas visibility.
- OrbitControls attaches touch listeners and sets touch-action:none, competing with page scrolling.
- The snowflake alone had 126,125 triangles. The original desk and books models were 17.83 MB and 13.42 MB.

## Changes

- Shared SceneCanvas mounts a scene when it first becomes visible, retains it for reuse, and stops its render loop offscreen or while the page is hidden.
- Mobile scenes pause during scrolling and resume 140 ms after scrolling stops. Scroll-driven canvas measurement is disabled; size changes still update the canvas.
- Pixel ratio is capped at 1 on mobile/coarse pointers and 1.5 on desktop (previously up to 2). On a DPR-2 phone, this uses one quarter as many rendering pixels.
- Soft floor shadows are baked once at 256px rather than regenerated every frame. They remain a static grounding shadow while the objects float.
- Independent GSAP loops now use the canvas frame loop, so they pause with the scene. Rotation deltas are capped to avoid large jumps after a pause.
- Touch users can scroll over the 3D illustrations. Mouse users retain drag-to-rotate. Ambient rotation remains on mobile when idle.
- Mobile globe spheres use fewer segments. Generated flag textures are disposed on unmount.
- Reduced-motion preferences use on-demand rendering.
- Original models remain untouched; mobile versions preserve the named nodes/materials used by the React components.

| Asset | Original | Mobile |
| --- | ---: | ---: |
| Desk | 17,830,248 bytes | 2,938,872 bytes |
| Books | 13,424,672 bytes | 1,663,664 bytes |
| Snowflake | 3,052,956 bytes; 126,125 triangles | 296,020 bytes; 15,135 triangles |

Mobile models were generated with glTF Transform CLI 4.5.1: resize desk/books textures to at most 1024px, then WebP quality 75; simplify snowflake with ratio 0.12 and error 0.01. WebP textures require a modern browser supporting WebP (including current iOS Safari and Android Chrome).

## Verification

- Production build and ESLint pass.
- Parsed original and optimized GLB metadata: required node and material names are preserved; desk/books geometry triangle counts are unchanged.
- Browser checked original desktop styling and phone viewport with coarse touch input enabled.
- Checked the mobile desk, books and globe render successfully without browser errors.
- Verified other scenes are paused while the globe is visible, and below-fold scenes are initially unmounted.
- Confirmed mobile canvas backing width equals CSS width (DPR 1) and no descendant sets touch-action:none.

No before/after frame-rate claim is made. Physical phone testing on the deployed production build remains necessary to verify device-specific smoothness. The existing build emits a dependency warning about eval in three-stdlib's lottie module; it is not a build failure.

## Responsive model framing

Desk and books use FitScene to project each mesh's bounding-box corners into the camera view, fitting both horizontal and vertical limits. This keeps them larger than the initial conservative sphere fit. Margins are 12% for the animated desk decorations and 6% for books. Cached corners are reused when desktop orbit controls rotate the camera; geometry bounds are recomputed only after loading or resizing. Each canvas remains isolated and clipped inside its own layout column.

Verified phone and narrow desktop layouts, including rotating the books. Build and lint pass. Model scale is constrained by available canvas width so the full scene remains visible; the canvas does not expand over surrounding content.
