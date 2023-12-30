<script setup>
import { ref, computed } from 'vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

const db = useFirestore()

const productCollection = useCollection(collection(db, 'products'))

const filterParams = ref({
  text: '',
  favorite: false,
})

const filteredProducts = computed(() => {
  return productCollection.value.filter((product) => {
    return (
      product.name.toLowerCase().includes(filterParams.value.text.toLowerCase()) &&
      (filterParams.value.favorite ? product.favorite : true)
    )
  })
})
</script>

<template>
  <SidebarLayout>
    <template v-slot:sidebar>
      <BaseContainer>
        <h2 class="mb-4">Filter</h2>
        <BaseForm>
          <BaseInput v-model="filterParams.text" label="Name" />
          <BaseCheckbox v-model="filterParams.favorite" label="Favorited" />
        </BaseForm>
      </BaseContainer>
    </template>

    <template v-slot:main>
      <BaseContainer>
        <h2 class="mb-4">Content</h2>
        <ProductCard
          v-for="product in filteredProducts"
          v-bind="product"
          :docId="product.id"
          :key="product.id"
        />
      </BaseContainer>
    </template>
  </SidebarLayout>
</template>

<style></style>
