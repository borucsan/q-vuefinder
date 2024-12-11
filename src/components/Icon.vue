<template>
    <component :is="component" v-bind="iconData.iconProps" />
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

const iconData = computed(() => {
   let tag = iconComponent.tag ?? 'svg';
   let icon = icons[props.icon];
   let iconKey = icon?.iconKey ?? iconComponent.iconKey;
   let iconProps = {};
   if (!icon) {
        console.error(`Icon ${props.icon} not found`);
        return null;
    }
    iconProps = {...iconComponent.customProps, ...(icon.props ?? {})};
    if(icon.tag) {
        console.debug(`Icon ${props.icon} is an object with tag and icon properties`, icon);
        tag = icon.tag;
        icon = icon.icon;
    }

    
    if(iconKey && icon) {
        iconProps[iconKey] = icon;
    }
    return {
        tag,
        icon,
        iconProps
    };
});

const component = computed(() => {
    const { tag, icon } = iconData.value;
    if(!tag || tag === 'svg') {
        return defineAsyncComponent(() => icon);
    } else {
        return tag;
    }
})
</script>