# Below the Surface portfolio redesign

The original site is preserved at commit `97b2dab`, on branch `backup/before-ocean-redesign-2026-10-03`. The redesign lives on `codex/below-the-surface`. Existing components and portfolio data are preserved.

To restore the original appearance, restore `src/App.tsx` and `src/index.css` from the backup branch. The unused ocean assets and this note can remain without affecting the original site.

## Design reference

Adapted from [Below the Surface by Katia Gil Guzman, OpenAI](https://developers.openai.com/showcase/below-the-surface), with the ocean background and Geist font obtained from the live reference at https://below-the-surface-ocean.openai.chatgpt.site/. The network illustration is a custom SVG; portfolio copy, project data, experience, education, social links and EmailJS settings come from the existing portfolio.

The page uses native scrolling, chapter links, collapsible experience details, a full skill list, a motion pause control, and reduced-motion support. Contact delivery uses the existing EmailJS environment configuration.
