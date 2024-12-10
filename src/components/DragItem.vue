<template>
  <div class="vuefinder__drag-item__container">
    <Icon icon="drag" />
    <div class="vuefinder__drag-item__count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue';
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
});
</script>
