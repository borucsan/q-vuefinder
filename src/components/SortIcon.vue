<template>
  <div>
    <Icon icon="asc" v-if="direction==='asc'" />
    <Icon icon="desc" v-if="direction==='desc'" />
  </div>
</template>

<script setup>
import Icon from './Icon.vue';

defineProps({direction: String});
</script>
