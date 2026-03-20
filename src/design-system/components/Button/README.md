# Button

Primary action trigger. Uses MUI Button with theme from the design pipeline.

## Usage

```tsx
import { Button } from '@/design-system/components';

<Button variant="contained" color="primary">
  Label
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| color | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success' \| 'inherit'` | `'primary'` | Color from theme palette |
| variant | `'contained' \| 'outlined' \| 'text'` | `'contained'` | Visual style |
| startIcon | `ReactNode` | — | Icon before label (Figma: Icon Start) |
| endIcon | `ReactNode` | — | Icon after label (Figma: End Icon) |
| disabled | `boolean` | `false` | Disabled state |
| children | `ReactNode` | — | Button label |

## Examples

**With start icon:**
```tsx
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

<Button startIcon={<ChevronLeftIcon style={{ width: 20, height: 20 }} />}>
  Back
</Button>
```

**With end icon:**
```tsx
import { ChevronRightIcon } from '@heroicons/react/24/outline';

<Button endIcon={<ChevronRightIcon style={{ width: 20, height: 20 }} />}>
  Next
</Button>
```
