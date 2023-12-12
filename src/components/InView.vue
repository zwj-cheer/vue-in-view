<script setup lang="ts">
import { inView } from "@/utils/in-view";
import { onMounted, ref, defineEmits } from "vue";

const inViewRef = ref<Element>();

const emit = defineEmits<{
  onEnter: [ele: Element]
  onExit: [ele: Element]
  onceEnter: [ele: Element]
  onceExit: [ele: Element]
}>()

onMounted(() => {
  inView?.(inViewRef.value!)
    ?.on("enter", (ele) => {
      emit('onEnter', ele)
    })
    .on("exit", (ele) => {
      emit('onExit', ele)
    })
    .once('enter', (ele) => {
      emit('onceEnter', ele)
    })
    .once('exit', (ele)=> {
      emit('onceExit', ele)
    });
});
</script>

<template>
  <div class="in-view" ref="inViewRef">
    <slot></slot>
  </div>
</template>

