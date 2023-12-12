# vue-in-view

Get notified when a DOM element enters or exits the viewport.

## In-view

See [in-view](https://www.npmjs.com/package/in-view)

## Installation & Usage

### npm & ESM

```bash
npm install vue3-in-view
```

### pnpm & ESM

```bash
pnpm add vue3-in-view
```

## Example

```sh
<script setup lang="ts">
import { InView } from "vue3-in-view";


const handleEnter = (e: Element): void => {
  console.log(e, 'on');
}

const handleOnceEnter = (e: Element): void => {
  console.log(e, 'once');
}

</script>

<template>
  <InView @on-enter="handleEnter" @once-enter="handleOnceEnter">dfsdafsadfsadfsdf</InView>
  <div class="test">1</div>
  <InView @on-enter="handleEnter" @once-enter="handleonceEnter">dfsdafsadfsadfsdf</InView>
  <div class="test">2</div>
  <InView @on-enter="handleEnter" @once-enter="handleonceEnter">dfsdafsadfsadfsdf</InView>
  <div class="test">3</div>
  <InView @on-enter="handleEnter" @once-enter="handleonceEnter">dfsdafsadfsadfsdf</InView>
  <div class="test">4</div>
  <InView @on-enter="handleEnter" @once-enter="handleonceEnter">dfsdafsadfsadfsdf</InView>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.demo {
  height: 100px;
  border: 1px solid red;
}

.test {
  height: 500px;
}
</style>

```