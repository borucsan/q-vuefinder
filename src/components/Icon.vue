<template>
    <component :is="component" v-bind="properties" />
</template>

<script setup>
import { defineAsyncComponent, computed, inject } from 'vue';

const app = inject('ServiceContainer');
const { icons, iconComponent } = app;

const props = defineProps({
  icon: {
    type: String,
    required: true,
  }
});

const properties = computed(() => {
  return {...iconComponent.props ?? {}};
});

const component = computed(() => {
    return defineAsyncComponent(() => icons[props.icon]);
})
</script>