<script setup>
import { computed } from 'vue'
import BaseImage from '@/components/base/BaseImage.vue'

const productImage = computed(() => {
  const images = ['breakfast', 'curry', 'spaghetti', 'veggies']
  const randomIndex = Math.floor(Math.random() * images.length)

  return `/images/${images[randomIndex]}.jpg`
})
</script>

<template>
  <BaseImage :src="productImage" cover height="150" />
</template>

<style></style>
