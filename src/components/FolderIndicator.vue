<template>
  <div class="vuefinder__folder-indicator">
    <div class="vuefinder__folder-indicator--icon">
      <Icon icon="square_minus" class="vuefinder__folder-indicator--minus" v-if="model" />
      <Icon icon="square_plus" class="vuefinder__folder-indicator--plus" v-if="!model" />
    </div>
  </div>
</template>

<script setup>
import Icon from "./Icon.vue";

const model = defineModel();

</script>

