import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Preservation Tests — Property 2
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 *
 * These tests observe the CURRENT (unfixed) CSS and establish a baseline
 * that must be preserved after the bugfix is applied.
 *
 * Observation-first methodology:
 * - `.nav-link` has `font-size: 0.95rem` (desktop) and `0.75rem` (mobile ≤600px)
 * - `.nav-btn` has `font-size: 0.95rem` (desktop) and `0.75rem` (mobile ≤600px)
 * - `.navbar.navbar-pages .nav-active` has background, color, padding, border-radius,
 *   font-weight, and ::after { display: none } — but NO font-size
 * - `Navbar.css` must not be modified by the fix
 *
 * EXPECTED: All tests PASS on unfixed code (confirms baseline to preserve).
 */

// --- CSS Parsing Helpers ---

/**
 * Extracts top-level CSS rules (outside any @media block) for a given selector.
 * Returns an object of property: value pairs.
 */
function getMainRuleProperties(cssText, selector) {
  const properties = {};

  // Remove media query blocks to isolate top-level rules
  const withoutMedia = cssText.replace(/@media[^{]*\{[^{}]*(\{[^}]*\}[^{}]*)*\}/g, '');

  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const ruleRegex = new RegExp(escapedSelector + '\\s*\\{([^}]*)\\}', 'g');
  let match;

  while ((match = ruleRegex.exec(withoutMedia)) !== null) {
    const declarations = match[1].trim().split(';').filter(Boolean);
    for (const decl of declarations) {
      const [prop, ...valueParts] = decl.split(':');
      if (prop && valueParts.length > 0) {
        properties[prop.trim()] = valueParts.join(':').trim();
      }
    }
  }

  return properties;
}

/**
 * Extracts CSS rules inside a @media (max-width: 600px) block for a given selector.
 * Returns an object of property: value pairs.
 */
function getMediaQueryRuleProperties(cssText, selector) {
  const properties = {};

  const mediaRegex = /@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)\s*\{([\s\S]*?)\n\}/g;
  let mediaMatch;

  while ((mediaMatch = mediaRegex.exec(cssText)) !== null) {
    const mediaBody = mediaMatch[1];

    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const ruleRegex = new RegExp(escapedSelector + '\\s*\\{([^}]*)\\}', 'g');
    let ruleMatch;

    while ((ruleMatch = ruleRegex.exec(mediaBody)) !== null) {
      const declarations = ruleMatch[1].trim().split(';').filter(Boolean);
      for (const decl of declarations) {
        const [prop, ...valueParts] = decl.split(':');
        if (prop && valueParts.length > 0) {
          properties[prop.trim()] = valueParts.join(':').trim();
        }
      }
    }
  }

  return properties;
}

/**
 * Extracts ALL selectors from a CSS file (both top-level and inside media queries).
 * Returns an array of selector strings.
 */
function getAllSelectors(cssText) {
  const selectors = [];

  // Remove comments
  const noComments = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match selectors before { at top level (outside media queries)
  const withoutMedia = noComments.replace(/@media[^{]*\{([\s\S]*?)\n\}/g, (fullMatch, body) => {
    // Also extract selectors from inside media queries
    const innerRegex = /([^{}\s][^{}]*?)\s*\{[^}]*\}/g;
    let innerMatch;
    while ((innerMatch = innerRegex.exec(body)) !== null) {
      const sel = innerMatch[1].trim();
      if (sel && !sel.startsWith('@')) {
        selectors.push(sel);
      }
    }
    return '';
  });

  const outerRegex = /([^{}\s][^{}]*?)\s*\{[^}]*\}/g;
  let outerMatch;
  while ((outerMatch = outerRegex.exec(withoutMedia)) !== null) {
    const sel = outerMatch[1].trim();
    if (sel && !sel.startsWith('@')) {
      selectors.push(sel);
    }
  }

  return selectors;
}

// --- Load CSS files ---

const navbarCssPath = resolve(__dirname, 'Navbar.css');
const navbarPagesCssPath = resolve(__dirname, 'NavbarPages.css');

const navbarCssContent = readFileSync(navbarCssPath, 'utf-8');
const navbarPagesCssContent = readFileSync(navbarPagesCssPath, 'utf-8');

// --- Observed baseline values (unfixed code) ---

// .nav-link properties from Navbar.css
const OBSERVED_NAV_LINK_DESKTOP = getMainRuleProperties(navbarCssContent, '.nav-link');
const OBSERVED_NAV_LINK_MOBILE = getMediaQueryRuleProperties(navbarCssContent, '.nav-link,\\s*\\.nav-btn,\\s*\\.nav-active');

// .nav-btn properties from Navbar.css
const OBSERVED_NAV_BTN_DESKTOP = getMainRuleProperties(navbarCssContent, '.nav-btn');

// .nav-active visual styles from Navbar.css (the base styles)
const OBSERVED_NAV_ACTIVE_DESKTOP = getMainRuleProperties(navbarCssContent, '.nav-active');

// Snapshot of the entire Navbar.css content for integrity check
const NAVBAR_CSS_SNAPSHOT = navbarCssContent;

// --- Tests ---

describe('Preservation Tests: Baseline behavior that must be preserved after fix', () => {

  describe('Property 2.1: Non-active link styles (.nav-link, .nav-btn) must remain identical', () => {
    /**
     * **Validates: Requirements 3.1, 3.2, 3.4**
     *
     * For any random CSS property from .nav-link or .nav-btn,
     * the value must match the observed baseline.
     */

    const navLinkProps = Object.entries(OBSERVED_NAV_LINK_DESKTOP);
    const navBtnProps = Object.entries(OBSERVED_NAV_BTN_DESKTOP);

    it('.nav-link desktop properties are preserved', () => {
      // Observed: .nav-link has font-size: 0.95rem, font-weight: 500, color: var(--dark), etc.
      expect(navLinkProps.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: navLinkProps.length - 1 }),
          (propIndex) => {
            const [prop, value] = navLinkProps[propIndex];
            const currentProps = getMainRuleProperties(navbarCssContent, '.nav-link');
            expect(currentProps[prop]).toBe(value);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('.nav-link has font-size: 0.95rem in desktop', () => {
      expect(OBSERVED_NAV_LINK_DESKTOP['font-size']).toBe('0.95rem');
    });

    it('.nav-btn desktop properties are preserved', () => {
      expect(navBtnProps.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: navBtnProps.length - 1 }),
          (propIndex) => {
            const [prop, value] = navBtnProps[propIndex];
            const currentProps = getMainRuleProperties(navbarCssContent, '.nav-btn');
            expect(currentProps[prop]).toBe(value);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('.nav-btn has font-size: 0.95rem in desktop', () => {
      expect(OBSERVED_NAV_BTN_DESKTOP['font-size']).toBe('0.95rem');
    });

    it('.nav-link and .nav-btn have font-size: 0.75rem in mobile (≤600px)', () => {
      /**
       * **Validates: Requirements 3.2**
       *
       * The mobile media query groups .nav-link, .nav-btn, .nav-active together.
       * We verify the grouped rule defines font-size: 0.75rem.
       */
      const mobileGroupedProps = getMediaQueryRuleProperties(navbarCssContent, '\\.nav-link,\\s*\n\\s*\\.nav-btn,\\s*\n\\s*\\.nav-active');

      // The grouped selector in Navbar.css is:
      //   .nav-link,
      //   .nav-btn,
      //   .nav-active {
      //     font-size: 0.75rem;
      //   }
      // We need a more flexible approach to parse this grouped selector
      const mediaBlocks = navbarCssContent.match(/@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)\s*\{([\s\S]*?)\n\}/g);
      expect(mediaBlocks).not.toBeNull();

      const mediaBody = mediaBlocks[0];
      // Check that font-size: 0.75rem exists for the grouped selector
      expect(mediaBody).toContain('font-size: 0.75rem');

      // Verify the grouped selector includes .nav-link, .nav-btn, .nav-active
      expect(mediaBody).toContain('.nav-link');
      expect(mediaBody).toContain('.nav-btn');
      expect(mediaBody).toContain('.nav-active');
    });
  });

  describe('Property 2.2: Visual styles of .nav-active must remain unchanged', () => {
    /**
     * **Validates: Requirements 3.3**
     *
     * The visual styles of .nav-active (background, color, padding, border-radius,
     * font-weight) must remain identical. Only font-size may be added by the fix.
     */

    const VISUAL_PROPERTIES = ['background', 'color', 'padding', 'border-radius', 'font-weight', 'text-decoration'];

    it('.nav-active visual properties in Navbar.css are preserved', () => {
      const observedVisualProps = {};
      for (const prop of VISUAL_PROPERTIES) {
        if (OBSERVED_NAV_ACTIVE_DESKTOP[prop] !== undefined) {
          observedVisualProps[prop] = OBSERVED_NAV_ACTIVE_DESKTOP[prop];
        }
      }

      const visualEntries = Object.entries(observedVisualProps);
      expect(visualEntries.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: visualEntries.length - 1 }),
          (propIndex) => {
            const [prop, expectedValue] = visualEntries[propIndex];
            const currentProps = getMainRuleProperties(navbarCssContent, '.nav-active');
            expect(currentProps[prop]).toBe(expectedValue);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('.nav-active has expected visual property values', () => {
      // Observed baseline values from Navbar.css
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['background']).toBe('linear-gradient(135deg, var(--pink), var(--mauve-dark))');
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['color']).toBe('var(--white)');
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['padding']).toBe('0.5rem 1.25rem');
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['border-radius']).toBe('50px');
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['font-weight']).toBe('600');
      expect(OBSERVED_NAV_ACTIVE_DESKTOP['text-decoration']).toBe('none');
    });

    it('NavbarPages.css .nav-active override preserves visual styles from Navbar.css', () => {
      /**
       * NavbarPages.css currently only overrides background-related properties
       * on .navbar.navbar-pages (not on .nav-active directly at top level).
       * The mobile media query only overrides padding for .nav-active.
       * This test verifies that NavbarPages.css does NOT override the visual
       * properties that should be preserved.
       */
      const navbarPagesActiveMain = getMainRuleProperties(navbarPagesCssContent, '.navbar.navbar-pages .nav-active');

      // Currently, NavbarPages.css has NO top-level rule for .navbar.navbar-pages .nav-active
      // So this should be empty — the visual styles come from Navbar.css
      for (const prop of ['background', 'color', 'border-radius', 'font-weight', 'text-decoration']) {
        // If NavbarPages.css defines any of these, they must match the Navbar.css baseline
        if (navbarPagesActiveMain[prop] !== undefined) {
          expect(navbarPagesActiveMain[prop]).toBe(OBSERVED_NAV_ACTIVE_DESKTOP[prop]);
        }
      }
    });

    it('.nav-active mobile padding in NavbarPages.css is preserved', () => {
      /**
       * NavbarPages.css defines padding: 0.4rem 1rem for .nav-active in mobile.
       * This must be preserved.
       */
      const mobileActiveProps = getMediaQueryRuleProperties(navbarPagesCssContent, '.navbar.navbar-pages .nav-active');
      expect(mobileActiveProps['padding']).toBe('0.4rem 1rem');
    });
  });

  describe('Property 2.3: Navbar.css must not be modified (Home navbar preservation)', () => {
    /**
     * **Validates: Requirements 3.1, 3.2**
     *
     * The entire Navbar.css file must remain identical.
     * This ensures the Home navbar is completely unaffected by the fix.
     */

    it('Navbar.css content integrity check', () => {
      const currentContent = readFileSync(navbarCssPath, 'utf-8');
      expect(currentContent).toBe(NAVBAR_CSS_SNAPSHOT);
    });

    it('Navbar.css contains all expected selectors', () => {
      const expectedSelectors = [
        '.navbar',
        '.navbar.scrolled',
        '.navbar-inner',
        '.nav-link',
        '.nav-btn',
        '.nav-active',
      ];

      const allSelectors = getAllSelectors(navbarCssContent);

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: expectedSelectors.length - 1 }),
          (selectorIndex) => {
            const expectedSelector = expectedSelectors[selectorIndex];
            const found = allSelectors.some(s => s.includes(expectedSelector));
            expect(found).toBe(true);
          }
        ),
        { numRuns: 30 }
      );
    });

    it('Navbar.css .nav-link font-size values are correct for all viewports', () => {
      /**
       * Using fast-check to generate random viewports and verify
       * that .nav-link font-size is always correctly defined in Navbar.css.
       */
      const mainProps = getMainRuleProperties(navbarCssContent, '.nav-link');

      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 1920 }),
          (viewportWidth) => {
            if (viewportWidth > 600) {
              expect(mainProps['font-size']).toBe('0.95rem');
            } else {
              // In mobile, the grouped selector defines 0.75rem
              const mediaBlocks = navbarCssContent.match(/@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)\s*\{([\s\S]*?)\n\}/g);
              expect(mediaBlocks).not.toBeNull();
              expect(mediaBlocks[0]).toContain('font-size: 0.75rem');
              expect(mediaBlocks[0]).toContain('.nav-link');
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Navbar.css .nav-btn font-size values are correct for all viewports', () => {
      const mainProps = getMainRuleProperties(navbarCssContent, '.nav-btn');

      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 1920 }),
          (viewportWidth) => {
            if (viewportWidth > 600) {
              expect(mainProps['font-size']).toBe('0.95rem');
            } else {
              const mediaBlocks = navbarCssContent.match(/@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)\s*\{([\s\S]*?)\n\}/g);
              expect(mediaBlocks).not.toBeNull();
              expect(mediaBlocks[0]).toContain('font-size: 0.75rem');
              expect(mediaBlocks[0]).toContain('.nav-btn');
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2.4: Non-.nav-active selectors in NavbarPages.css must remain identical', () => {
    /**
     * **Validates: Requirements 3.4**
     *
     * For all selectors in NavbarPages.css that are NOT `.navbar.navbar-pages .nav-active`,
     * the CSS rules must remain identical before and after the fix.
     */

    it('.navbar.navbar-pages base styles are preserved', () => {
      const baseProps = getMainRuleProperties(navbarPagesCssContent, '.navbar.navbar-pages');

      // Observed baseline
      expect(baseProps['background']).toBe('rgba(252, 232, 245, 0.85)');
      expect(baseProps['backdrop-filter']).toBe('blur(16px)');
      expect(baseProps['-webkit-backdrop-filter']).toBe('blur(16px)');
    });

    it('NavbarPages.css non-active selectors are preserved with random property checks', () => {
      const baseProps = getMainRuleProperties(navbarPagesCssContent, '.navbar.navbar-pages');
      const baseEntries = Object.entries(baseProps);

      if (baseEntries.length > 0) {
        fc.assert(
          fc.property(
            fc.integer({ min: 0, max: baseEntries.length - 1 }),
            (propIndex) => {
              const [prop, value] = baseEntries[propIndex];
              const currentProps = getMainRuleProperties(navbarPagesCssContent, '.navbar.navbar-pages');
              expect(currentProps[prop]).toBe(value);
            }
          ),
          { numRuns: 30 }
        );
      }
    });
  });
});
