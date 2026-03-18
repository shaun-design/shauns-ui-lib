# Phase 8: Figma-to-Code Component Generation

## Part A: Training Guide (Complete Before Phase 8)

Junior designers must complete this setup before running the Phase 8 prompt.

### 1. Enable MCP in Figma

- Follow Figma's guide: [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- Choose **Remote** (hosted) or **Desktop** (runs via Figma app) server
- Complete the setup steps for your chosen option

### 2. Connect Cursor to Figma MCP

- In Cursor: Add the Figma MCP server (Remote or Desktop per step 1)
- Verify the connection works

### 3. Select a Component

- In Figma: Select the frame or layer you want to implement
- Copy the link from the address bar (e.g. `https://www.figma.com/file/xxx/yyy?node-id=123-456`)
- You'll paste this link when you run Phase 8

**Troubleshooting:** If the AI can't read the component, check: (1) MCP is connected, (2) the link includes the correct node ID, (3) you have access to the file.

---

## Part B: Phase 8 Prompt (For Claude)

Copy the prompt below and use it when you're ready to generate a component from Figma.

---

```
PROJECT VARIABLES:
- Repo: GitHub connected
- Figma MCP: Enabled in Figma and Cursor
- Component: Designer has selected a component in Figma and will share the link

PHASE CONTEXT:
- Assumes Phase 7 complete. Storybook and Chromatic run successfully.
- Assumes designer completed the training guide: MCP enabled in Figma, Cursor connected to Figma MCP, component selected.

WORKING STYLE:
- Explain like I'm new to design systems
- Define terms on first use (e.g. "props", "variant", "component API", "barrel export")

LEARNING MODE (for junior designers):
- After completing work, report what you did so the designer can learn
- Check for understanding and invite follow-up questions

STOP CONDITIONS:
- If no component selected or link not provided → STOP
- If designer hasn't confirmed props match → STOP before generating code

---

TASKS:

1. CHECK FOR EXISTING COMPONENT
   - Before reading from Figma, look in src/design-system/components/ for a component with the same name (e.g. Button)
   - If one exists: compare the designer's API (from step 3) to the existing component's props
   - If it matches: Report "We already have a [ComponentName] that matches this. No need to recreate it. You can use it from the design system." Then skip to step 6 (report).
   - If it exists but differs: Report "We have a [ComponentName], but the API differs. [List differences]. Do you want to update the existing component or create a new variant?" Wait for designer response.
   - If none exists: continue to step 2

2. READ THE SELECTED COMPONENT
   - Designer provides the Figma link (e.g. figma.com/file/xxx?node-id=yyy)
   - Use Figma MCP to read the selected component
   - Extract and report the props you can infer: variants, sizes, states, slots (icon left/right, children)

3. COMPARE TO DESIGNER'S API
   - Designer provides the expected Figma component API using this template:

     Component: [Name]
     Props:
     - [propName]: [type]
     - [propName]: [type]

     Example:
     Component: Button
     Props:
     - variant: 'primary' | 'secondary' | 'ghost'
     - size: 'sm' | 'md' | 'lg'
     - disabled: boolean
     - loading: boolean
     - iconLeft: ReactNode
     - iconRight: ReactNode
     - children: string

   - Compare your read props to the designer's API
   - Report: match, mismatch, or missing props

4. CONFIRM WITH DESIGNER
   - Prompt: "Here's what I read from Figma: [list]. Your API says: [list]. Do these match, or should I change anything?"
   - Wait for designer confirmation before proceeding

5. CREATE REACT COMPONENT
   - Use MUI base component
   - Use the MUI theme from the design pipeline (createTheme from tokens.json → build-tokens → theme). No hardcoded colors, typography, or spacing.
   - Implement the confirmed props
   - Store at: src/design-system/components/{ComponentName}/
   - Add component to barrel export: src/design-system/components/index.ts (create file if it doesn't exist). Export so it can be imported as: import { ComponentName } from '@/design-system/components'
   - Optional: Add README.md per component (usage, props, examples)
   - Optional: Show example usage in App.tsx or provide a usage snippet

6. PUBLISH TO STORYBOOK & CHROMATIC
   - Add Storybook story (CSF3 format, all variants/sizes/states)
   - Component will appear in Chromatic via existing Storybook

7. REPORT & CHECK UNDERSTANDING
   - Summarize what you did: component created (or skipped if existing), props implemented, theme usage, story added, barrel export updated
   - Ask: "Does this match what you expected? Any questions about how the component works or how it connects to the design system?"

---

TECHNICAL REQUIREMENT:
- All styling (color, typography, padding, etc.) must use the MUI theme from the design pipeline. Use theme.palette, theme.typography, theme.spacing, theme.shape—never hardcode colors, font sizes, or spacing values.

---

SUCCESS CRITERIA:
- Existing components detected and not recreated when they match
- Props read from Figma and confirmed by designer
- React component created using MUI theme (no hardcoded styles)
- Component added to barrel export (src/design-system/components/index.ts)
- Storybook story added
- Designer understands what was built

OUTPUT:
- React component file(s)
- Story file
- Barrel export updated
- Optional: Component README.md, App.tsx usage snippet
- Brief report of work completed

---

FINAL CHECK:
- Ask: "Do you understand how this component connects to your design pipeline (tokens → theme → component)? Any follow-up questions?"
```

---
