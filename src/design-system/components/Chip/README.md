# Chip

Compact element for tags, filters, or input chips. Uses MUI Chip with the design system theme.

## Props

| Prop       | Type                                                                 | Default   | Description                          |
| ---------- | -------------------------------------------------------------------- | --------- | ------------------------------------ |
| `label`    | `string`                                                             | required  | Chip text                            |
| `size`     | `'small' \| 'large'`                                                 | `'large'` | Size (large = MUI medium)             |
| `color`    | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | `'default'` | Color from theme palette          |
| `variant`  | `'filled' \| 'outlined'`                                             | `'filled'`| Filled or outlined                   |
| `disabled` | `boolean`                                                            | `false`   | Disabled state                       |
| `deletable`| `boolean`                                                            | `false`   | Show delete icon (pass `onDelete`)   |
| `thumbnail`| `ReactElement`                                                       | —         | Icon or Avatar before label          |

## Usage

```tsx
import { Chip, Avatar } from '@/design-system/components';

<Chip label="Tag" />
<Chip label="Primary" color="primary" />
<Chip label="Deletable" deletable onDelete={() => console.log('deleted')} />

{/* Chip with Avatar thumbnail */}
<Chip label="John Doe" thumbnail={<Avatar content="text" initials="JD" size="24px" />} />
```

## Thumbnail

Pass an `<Avatar />` for user chips (e.g. assignees, mentions). Use `size="24px"` for large chips and `size="18px"` for small chips.
