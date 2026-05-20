# Cleanup pass: paths, pricing copy, logo

## 1. Remove every `.release` / `release/` reference

**`src/routes/docs.tsx`** — replace all CLI usage strings and prose:
- Lines 189, 190, 202, 204, 219, 272: `.\release\devmind.exe …` → `.\devmind.exe …`
- Line 268: `~/.devmind/release/` → `~/.devmind/`
- Line 290: "Double-click `release/devmind.exe`" → "Double-click `devmind.exe`"

**`install.ps1`** — fix candidate paths and the error message:
- Lines 27–29: drop the `release\` segment from the three candidate paths (keep `$PSScriptRoot\devmind.exe`, `..\devmind.exe`, `(Get-Location)\devmind.exe`).
- Line 59: `.\release\install.ps1` → `.\install.ps1`.

## 2. Free tier = 2 interceptions / day (consistent)

**`src/components/DevMindPage.tsx`**
- Line 31 (terminal hero frame): `interceptions  : 1 / 1   (today · free)` → `interceptions  : 2 / 2   (today · free)`
- Line 293 (pricing card body): `1 interception per day. After that, you're on your own.` → `2 interceptions per day. After that, you're on your own.`

## 3. Swap site logo to the uploaded matte-black orb

The uploaded `user-uploads://logo.png` is the new glossy black sphere with the triangle. Plan:
1. `code--copy user-uploads://logo.png public/logo.png` (overwrite, used by `<img src="/logo.png">` in `SiteChrome.tsx`)
2. `code--copy user-uploads://logo.png src/assets/logo.png` (overwrite, keeps the source asset in sync)
3. Also overwrite `public/og-image.png` reference? No — out of scope; OG image stays as-is unless asked.

The current `Logo` component in `SiteChrome.tsx` already renders `/logo.png` inside the glass orb wrapper. Since the new image is itself a fully-rendered glossy orb, the extra glass ring/highlight will read as a duplicate bezel. Simplify `Logo` so it just renders the PNG with `rounded-full` (and keeps `focus-ring` + optional download anchor), removing the inline `radial-gradient` background, the inner-shadow box-shadow, and the two decorative `<span>` highlights. Keep the `size` prop and `downloadable` behavior intact. Header/footer call sites stay unchanged.

## 4. Verification

- `rg -n "\.release|release/devmind|release\\\\devmind|1 / 1|1 interception" src/ public/ install.ps1` should return zero hits.
- Visually confirm header/footer logo renders the new orb cleanly at 20–22px without a double-bezel.
- Confirm hero terminal frame 3 shows `2 / 2` and Free card body says "2 interceptions per day".

## Out of scope
OG image, payment automation, license delivery, privacy/refund pages — flagged previously, not part of this request.
