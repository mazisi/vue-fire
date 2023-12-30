<script setup>
import { computed } from 'vue'
import { deleteDoc, doc } from '@firebase/firestore'
import { useFirestore } from 'vuefire'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import BaseImageCard from '@/components/base/BaseImageCard.vue'
import BaseRating from '@/components/base/BaseRating.vue'
import ProductImage from '@/components/ProductImage.vue'

const props = defineProps({
  description: {
    type: String,
    default: 'No review yet',
  },
  docId: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: 'South Africa',
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Number,
    default: 0,
  },
})


const db = useFirestore()

async function deleteProduct() {
  await deleteDoc(doc(db, 'products', props.docId))
}
</script>

<template>
  <BaseImageCard>
    <template v-slot:image>
      <ProductImage />
    </template>
    <template v-slot:title>
      {{ name }}
    </template>
    <template v-slot:subtitle v-if="favorite">
      <BaseIcon
        color="error"
        icon="mdi-fire-circle"
        size="small"
        class="mr-1"
      />
      <span class="mr-1">Favorite</span>
    </template>
    <template v-slot:rating>
      <BaseRating
        :model-value="rating"
        color="amber"
        density="compact"
        half-increments
        readonly
        size="small"
      />
      <div class="text-grey ms-2">{{ rating }}</div>
    </template>
    <template v-slot:description>
      <p>{{ description }}</p>
    </template>
    <template v-slot:price>
      {{ price }}
    </template>
    <template v-slot:actions>
      <BaseButton color="primary" :to="`/product/${docId}`">
        <BaseIcon icon="mdi-pencil" class="mr-1" /> Edit
      </BaseButton>
      <BaseButton @click="deleteProduct" color="error" text>
        <BaseIcon icon="mdi-trash-can-outline" class="mr-1" />
        Delete
      </BaseButton>
    </template>
  </BaseImageCard>
</template>

<style></style>
