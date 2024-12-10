<template>
  <div>
    <Icon icon="asc" v-if="direction==='asc'" />
    <Icon icon="desc" v-if="direction==='desc'" />
  </div>
</template>

<script setup>
import AscSVG from './icons/asc.svg';
import DescSVG from './icons/desc.svg';

defineProps({direction: String});
</script>
