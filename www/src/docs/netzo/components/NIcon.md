<script setup>
import SectionDocsCards from '@theme/components/sections/SectionDocsCards.vue'
import en from '~/locales/en.js'
const item = en.components.find(({ uid }) => uid === 'icon')
</script>

<div class="mb-5 w-75px h-75px"  :class="item.icon" />

# `NIcon`

{{ item.description }}

## Usage

```tsx
import { NIcon } from 'netzo/components/mod.ts'

export default () => <NIcon />
```

## Configuration

```ts
interface NIconProps { }
```