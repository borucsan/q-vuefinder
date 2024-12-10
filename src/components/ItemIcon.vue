<template>
  <span class="vuefinder__item-icon">
    <Icon icon="folder" v-if="type === 'dir'" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
    <Icon icon="file" v-else :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
  </span>
</template>

<script setup>
import Icon from './Icon.vue';

defineProps({
  type: {
    type: String,
    required: true
  },

  small: {
    type: Boolean,
    default: false
  }
})

</script>
