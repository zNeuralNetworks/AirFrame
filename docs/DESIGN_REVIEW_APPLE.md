# Design Review: Modern Apple Aesthetic (Apple Books Style)

This review outlines how the Airframe application can be evolved to align with Apple's modern design language, specifically drawing inspiration from the **Apple Books** and **SF Symbols** design systems.

## 1. Typography: The "New York" & "SF Pro" Pairing
Apple's design is defined by its high-quality typography. Currently, the app uses a standard sans-serif (Inter).

*   **Reading Experience**: In Apple Books, the content is the hero. We should introduce a premium Serif font (like **New York** or **Georgia**) for the lesson content (`LessonView.tsx`). This signals a "reading" mode that is distinct from the "utility" mode of the dashboard.
*   **UI Clarity**: Use **SF Pro** (or a clean system-ui stack) for all navigation, labels, and buttons.
*   **Hierarchy**: Use wider tracking (letter-spacing) for small uppercase labels and tighter tracking for large headlines.

## 2. Color & Material: "Glassmorphism"
Apple uses "materials" rather than flat colors. The current Slate/Sky palette feels like a standard SaaS product.

*   **Backgrounds**: Move from `#F8FAFC` (Slate 50) to a softer `#F2F2F7` (Apple System Gray 6).
*   **Translucency**: Use `backdrop-blur-md` and semi-transparent backgrounds for sticky headers, sidebars, and modals. This creates a sense of depth and "place."
*   **Vibrancy**: Use Apple-standard colors for icons and accents (SF Blue: `#007AFF`, SF Orange: `#FF9500`).

## 3. Layout & Shape: Softness and Depth
Apple Books uses soft, rounded corners and layered shadows to create a tactile feel.

*   **Corner Radii**: Increase corner rounding to `24px` or `32px` for main cards and containers.
*   **Shadows**: Replace harsh borders with very soft, multi-layered shadows (`box-shadow: 0 4px 30px rgba(0,0,0,0.05)`).
*   **The "Library" Feel**: In the `Databank.tsx`, terms and playbooks could be presented as "cards" that feel like physical objects, similar to how book covers are displayed in Apple Books.

## 4. Interaction: Fluidity and Feedback
Apple's UI feels "alive" through subtle animations.

*   **Sheets & Popovers**: The Glossary side panel should feel like an Apple "Sheet" (sliding up from the bottom on mobile, or a soft-edged popover on desktop) rather than a rigid sidebar.
*   **Micro-interactions**: Add subtle scale-down effects on button press (`active:scale-95`) and smooth transitions between lesson tabs.
*   **Haptic Visuals**: Use `motion` to create "spring" animations for opening lessons or expanding cheatsheets, avoiding linear movements.

## 5. Specific Component Enhancements

### Lesson View
*   **Reading Mode**: When a user enters a lesson, the UI should "recede." The sidebar could collapse, and the content should be centered with generous margins, using a serif font.
*   **Progress**: Replace the current step-indicator with a subtle "page" indicator or a thin progress bar at the very top of the viewport.

### Databank (The Library)
*   **Visual Cards**: Instead of a list of terms, use a grid of cards with large, clear icons or "mini-visuals" that make the library feel rich and explorable.
*   **Search**: The search bar should be integrated into the header with a "glass" effect, similar to the search in iOS Settings or Apple Music.

## Summary of Aesthetic Shift
| Element | Current (SaaS/Tailwind) | Target (Modern Apple) |
| :--- | :--- | :--- |
| **Typography** | Inter (Sans) | New York (Serif) + SF Pro (Sans) |
| **Corners** | 12px - 16px | 24px - 32px |
| **Borders** | Slate-200 | Translucent separators / Soft shadows |
| **Background** | Slate-50 | System Gray 6 (#F2F2F7) |
| **Effects** | Flat / Solid | Backdrop Blur / Vibrancy |

---
*This review is intended as a strategic guide. No code changes have been made at this stage.*
