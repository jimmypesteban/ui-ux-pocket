// ---------------------------------------------------------------------------
// Layout tokens
// ---------------------------------------------------------------------------
// This file formalizes the spacing, radius, and grid conventions that were
// already emerging ad hoc across the app's `makeStyles()` functions. Rather
// than force every screen onto a stricter scale (which would mean re-tuning
// visual rhythm that was already dialed in), this is an audit-and-name pass:
// every value below is a real, repeated value pulled from the existing
// screens, given a single source of truth and a semantic name.
//
// GRID
// The app has no multi-column grid. Every screen is a single vertical stack
// (implicit `flexDirection: 'column'`) inset by `space.screenPadding` on the
// left/right. The only "columns" that appear are small, even-split row
// groups — stat rows, answer buttons, tab bars — and those are laid out with
// `flexDirection: 'row'` + `flex: 1` per child (or `justifyContent:
// 'space-between'`), not a fixed column grid. That's a deliberate choice for
// a single-column, phone-first reading experience — there's no tablet/desktop
// layout to reconcile a grid against.
//
// SPACING SCALE
// A 2px-increment scale from 4 to 24, then wider jumps (28, 32) for the
// biggest structural gaps (section dividers). Named by literal pixel value
// rather than t-shirt size (xs/sm/md…) because the scale is fine-grained
// enough that t-shirt names would either collide or require confusing
// half-steps (is 10 "sm" or "sm2"?). Pixel-named tokens stay unambiguous as
// the scale grows.
//
// Semantic aliases are layered on top for the four roles that recur on
// almost every screen — reach for those first; drop to the raw `space.N`
// scale for anything more one-off.
// ---------------------------------------------------------------------------

export const space = {
  space4: 4,
  space6: 6,
  space8: 8,
  space10: 10,
  space12: 12,
  space14: 14,
  space16: 16,
  space18: 18,
  space20: 20,
  space24: 24,
  space28: 28,
  space32: 32,

  // Semantic aliases — the four spacing roles that repeat on nearly every screen.
  /** Horizontal inset from the screen edge. Used by every screen's root container. */
  screenPadding: 24,
  /** Vertical padding inside cards, primary buttons, and bordered rows. */
  cardPadding: 16,
  /** Gap between a leading icon/glyph and its adjacent label. */
  rowGap: 12,
  /** Vertical breathing room around a section divider (`<View style={styles.divider} />`). */
  sectionGap: 28,

  // Top-padding conventions — there are exactly two, by screen role. Every
  // screen's ScrollView contentContainerStyle should use one of these two,
  // never a bare insets.top or a bare number, so the two tiers stay legible
  // in the code instead of drifting screen-by-screen.
  /**
   * For a top-level tab-root screen (Home, Games, Laws, the game-play
   * screens) — the screen owns the safe-area inset itself, since nothing
   * else on screen already accounts for it. Use as `insets.top + space.screenTopInset`.
   */
  screenTopInset: 24,
  /**
   * For content embedded under a sub-tab header (Profile's Stats/Log/Settings,
   * Types' Types/Pairs) — the wrapping screen already added `insets.top`
   * once at its own top level (title + sub-tab row), so the embedded content
   * only needs this fixed breathing room, not another safe-area add.
   */
  subScreenTop: 20,
};

// ---------------------------------------------------------------------------
// RADIUS SCALE
// Two tiers only. `card` is the default for anything with a visible border —
// buttons, cards, bordered rows, swatches. `chip` is for small inline
// elements (badges, tab dots, thin progress tracks) that read better fully-
// or near-fully rounded relative to their own small size.
//
// Fully circular elements (avatars, dots sized to look round) are NOT
// tokenized here — their radius is derived (`size / 2`), not a fixed
// constant, so they're computed inline at the call site instead.
// ---------------------------------------------------------------------------

export const radius = {
  chip: 2,
  card: 4,
};

// ---------------------------------------------------------------------------
// BORDER WIDTH
// The app uses a single hairline border weight everywhere a border appears
// (cards, dividers, input tracks). No secondary "thick border" tier exists.
// ---------------------------------------------------------------------------

export const border = {
  hairline: 1,
};
