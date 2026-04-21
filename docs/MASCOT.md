# Mascot Guidelines: Packet the Corgi

Packet is the official learning guide and mascot for the Airframe Academy. This document outlines the technical requirements for providing custom visual assets for Packet.

## Visual Identity
*   **Species**: Corgi (Pembroke Welsh)
*   **Style**: 3D Toy / High-Quality Render (Soft lighting, rounded shapes, expressive features)
*   **Key Accessories**: Blue "Airframe" jersey/vest, optional basketball.

## Technical Requirements for Custom Assets

If providing your own image assets to replace the current SVG implementation, they must follow these specifications:

### 1. File Format
*   **Format**: `.png` (Portable Network Graphics)
*   **Transparency**: Must include an Alpha Channel (transparent background). No solid white/colored backgrounds.
*   **Color Profile**: sRGB.

### 2. Resolution & Aspect Ratio
*   **Aspect Ratio**: 1:1 (Perfect Square).
*   **Minimum Resolution**: 512 x 512 pixels.
*   **Recommended Resolution**: 1024 x 1024 pixels (for crisp rendering on 4K/Retina displays).

### 3. Required Variations (Expressions)
To support the application's dynamic feedback system, the following states are required:

| Expression | Description |
| :--- | :--- |
| `neutral` | Standard pose, looking forward, calm. |
| `happy` | Wide smile, joyful eyes, energetic. |
| `excited` | Very happy, maybe a celebratory pose or sparkling eyes. |
| `confused` | Tilted head, specialized "question mark" ear dip or furrowed brow. |
| `thinking` | Paw to chin, looking up and to the side, contemplating. |
| `sleeping` | Eyes closed, quiet posture, small "Z" visual optional. |
| `alarmed` | Alert ears, wide eyes (used for critical errors). |

### 4. Composition Guidelines
*   **Padding**: Ensure there is a small consistent margin (approx 5%) around the character so shadows or ears aren't clipped at the edge of the frame.
*   **Lighting**: Maintain consistent lighting direction across all expressions to ensure seamless transitions.
*   **Perspective**: Front-facing or slightly 3/4 view is preferred for better engagement with the user.

## Implementation Notes
Current React Component: `src/shared/ui/Mascot.tsx`

When images are provided, the component will be updated to map the `expression` prop to the corresponding static image file:
`src/assets/mascot/corgimascot-{expression}.png`
