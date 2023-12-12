<script setup lang="ts">
import InView from "./components/InView.vue";


const handleEnter = (e: Element): void => {
  console.log(e, 'on');
}

const handleonceEnter = (e: Element): void => {
  console.log(e, 'once');
}

</script>

<template>
  <InView @on-enter="handleEnter" @once-enter="handleonceEnter">dfsdafsadfsadfsdf</InView>
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
