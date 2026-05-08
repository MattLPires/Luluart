import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Bug Condition Exploration Test — Property 1
 *
 * Validates: Requirements 1.1, 1.2
 *
 * This test reads the ACTUAL NavbarPages.css file and parses its CSS rules
 * to verify that `.navbar.navbar-pages .nav-active` defines `font-size`
 * consistently with the other navbar links.
 *
 * Bug condition: isBugCondition(input) =
 *   input.component = "NavbarPages"
 *   AND input.element.hasClass("nav-active")
 *   AND NOT cssRuleDefinesFontSize(".navbar.navbar-pages .nav-active", input.viewport)
 *
 * EXPECTED: This test FAILS on unfixed code — failure confirms the bug exists.
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

  // Find the selector's rule block
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
 * Extracts CSS rules inside a specific @media block for a given selector.
 * Returns an object of property: value pairs.
 */
function getMediaQueryRuleProperties(cssText, mediaCondition, selector) {
  const properties = {};

  // Find media blocks matching the condition
  const mediaRegex = /@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)\s*\{([\s\S]*?)\n\}/g;
  let mediaMatch;

  while ((mediaMatch = mediaRegex.exec(cssText)) !== null) {
    const mediaBody = mediaMatch[1];

    // Find the selector's rule block within the media body
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

// --- Test ---

describe('Bug Condition Exploration: NavbarPages .nav-active font-size', () => {
  const cssPath = resolve(__dirname, 'NavbarPages.css');
  const cssContent = readFileSync(cssPath, 'utf-8');

  const TARGET_SELECTOR = '.navbar.navbar-pages .nav-active';
  const EXPECTED_DESKTOP_FONT_SIZE = '0.95rem';
  const EXPECTED_MOBILE_FONT_SIZE = '0.75rem';

  it('Property 1: Bug Condition — For any viewport, .navbar.navbar-pages .nav-active must define the correct font-size', () => {
    /**
     * **Validates: Requirements 1.1, 1.2**
     *
     * For any random viewport width between 320px and 1920px:
     * - viewport > 600px: the main rule must contain font-size: 0.95rem
     * - viewport ≤ 600px: the @media (max-width: 600px) rule must contain font-size: 0.75rem
     */
    const mainRuleProps = getMainRuleProperties(cssContent, TARGET_SELECTOR);
    const mediaRuleProps = getMediaQueryRuleProperties(
      cssContent,
      'max-width: 600px',
      TARGET_SELECTOR
    );

    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          if (viewportWidth > 600) {
            // Desktop: main rule must define font-size: 0.95rem
            expect(mainRuleProps['font-size']).toBe(EXPECTED_DESKTOP_FONT_SIZE);
          } else {
            // Mobile (≤600px): media query rule must define font-size: 0.75rem
            expect(mediaRuleProps['font-size']).toBe(EXPECTED_MOBILE_FONT_SIZE);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
