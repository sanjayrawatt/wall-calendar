# Interactive Wall Calendar

**Live Demo:** [https://wall-calendar-eta-fawn.vercel.app/](https://wall-calendar-eta-fawn.vercel.app/)

A highly refined, interactive calendar component built with React and TypeScript. This project focuses on pushing the boundaries of frontend CSS to create an interface that feels like a tangible, physical wall calendar resting in a 3D environment, while maintaining perfect usability and logic.

## 🌟 Key Features
- **Date & Range Selection:** Intuitively click to toggle individual days or select continuous ranges. 
- **Contextual Notepad:** A built-in notes section that dynamically updates its scope. You can leave notes for a specific day, a multi-day range, or general month-level memos.
- **Physical Realism:** A purely CSS-driven design system simulating paper tension, wire hooks, nail shadows, and ambient directional bounce lighting.
- **Persistent Memory:** Fully integrated with `localStorage` so notes never disappear when the browser refreshes.

## 🎨 Design Decisions

### The Wall Calendar Aesthetic
Instead of building a typical "flat UI card" floating in empty space, this component is anchored in a realistic environment using advanced CSS techniques:
- **3D Perspective & Gravity:** The `.app-wrapper` establishes a `perspective: 1200px` boundary, allowing the calendar to be rotated along the X/Y/Z axes (`rotateX(2.5deg)`). It pivots slightly off-center from its metallic wire hanger, simulating the organic tilt of a heavy paper object hanging on a real wall.
- **Paper Tension:** Rather than perfectly sharp corners, a simulated, heavily blurred `::after` shadow sits at the bottom edge, creating the optical illusion that the physical paper is gently bowing outwards due to gravity.
- **Cinematic Lighting Bleed:** To prevent the photograph from feeling like a glowing digital screen, the `mix-blend-mode: multiply` paper grain is layered *over* both the calendar grid and the image. The frosted-blue sky tone from the hero image dynamically bleeds down into the calendar surface using layered radial and linear gradients, mimicking ambient bounce light.

### Date Range Selection
The interaction logic was intentionally designed for zero-friction toggling without needing explicit "Clear" or "Save" buttons:
- Handled entirely by a custom `useCalendar` hook powered by `date-fns`.
- If you select a start date and click a day occurring *before* it, it dynamically reassigns the start date rather than failing.
- Re-clicking heavily on highlighted boundary dates intelligently toggles the selection off completely, handing control instantly back to the user.
- Visuals use a bouncy `cubic-bezier` transform on click to provide satisfying tactile feedback.

### Contextual Notes Handling
Rather than a single static notepad, the notes section adapts its context scope dynamically based on what you are currently selecting in the calendar grid.
- By leveraging a custom wrapping `useLocalStorage` hook, the exact storage `key` mutates automatically on selection changes (e.g., `notes-2024-04-10-to-2024-04-13`).
- The UI follows suit—the header updates its specific label format, and the placeholder actively prompts you to write for the *current selection*.
- Background lines use mathematically precise `repeating-linear-gradients` tied exactly to the textarea's `line-height`, guaranteeing written text never breaks visual alignment with the paper rules.

### Responsiveness & Layout
The interface utilizes CSS Flexbox to fluidly adapt across platforms:
- **Desktop:** The notes act as a balanced left-hand panel alongside a spacious grid wrapper.
- **Mobile:** The `flex-direction` cleanly snaps to `column`, dropping the notes below the calendar block. The complex `perspective` layout dynamically shifts down to a lower intensity (`1000px`) and `overflow-y: auto` takes over the entire scene, ensuring the wire hangers, shadows, and interactive blocks never clip or cause horizontal fragmentation.
