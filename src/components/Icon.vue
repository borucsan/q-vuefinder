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
const componentProperties = {};
    if(iconComponent.iconProp) {
        componentProperties[iconComponent.iconProp] = props.icon;
    }
  return {
    ...(iconComponent.customProps || {}),
    ...componentProperties,
  };
});

const component = computed(() => {
    if(!iconComponent.tag || iconComponent.tag === 'svg') {
        return defineAsyncComponent(svgComponent);
    } else {
        return iconComponent.tag;
    }
})

const svgComponent = () => {
    const icon = icons[props.icon];
    if (!icon) {
        console.error(`Icon ${props.icon} not found`);
        return null;
    }
    return icon;
}
</script>