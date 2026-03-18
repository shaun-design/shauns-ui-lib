# Avatar

Displays user initials, icon, or image. Uses MUI Avatar with the design system theme.

## Props

| Prop       | Type                                      | Default   | Description                    |
| ---------- | ----------------------------------------- | --------- | ------------------------------ |
| `content`  | `'text' \| 'icon' \| 'image'`             | `'text'`  | Content type                   |
| `initials` | `string`                                  | `'OP'`    | Initials when content='text'   |
| `src`      | `string`                                  | —         | Image URL when content='image'|
| `icon`     | `ReactNode`                               | —         | Icon when content='icon'      |
| `size`     | `'18px' \| '24px' \| '32px' \| '40px'`   | `'40px'`  | Size in pixels                 |
| `variant`  | `'circular' \| 'rounded' \| 'square'`    | `'circular'` | Shape                       |
| `badge`    | `boolean`                                 | `false`   | Show green status badge        |

## Usage

```tsx
import { Avatar } from '@/design-system/components';
import { UserIcon } from '@heroicons/react/24/outline';

<Avatar content="text" initials="JD" />
<Avatar content="icon" icon={<UserIcon style={{ width: 20, height: 20 }} />} />
<Avatar content="image" src="/photo.jpg" />
<Avatar content="text" initials="OP" badge />
```

## With Chip

Use Avatar as the Chip thumbnail:

```tsx
import { Chip, Avatar } from '@/design-system/components';

<Chip label="John Doe" thumbnail={<Avatar content="text" initials="JD" size="24px" />} />
```
