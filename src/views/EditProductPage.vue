<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, updateDoc } from '@firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import FormLayout from '@/layouts/FormLayout.vue'

const db = useFirestore()
const route = useRoute()
const docRef = doc(db, 'products', route.params.id)

const productSource = useDocument(docRef)

const editProduct = ref({
  name: '',
  location: 'South Africa',
  rating: 0,
  price: 1,
  description: '',
  favorite: true,
})

watch(productSource, (productSource) => {
  editProduct.value = {
    ...productSource,
  }
})

async function updateProduct() {
  await updateDoc(docRef, {
    ...editProduct.value,
  })
}
</script>

<template>
  <FormLayout>
    <template v-slot:title>
      <h1 class="mb-4">Edit {{ productSource?.name ? productSource.name : '' }}</h1>
    </template>
    <template v-slot:content>
      <BaseCard>
        <template v-slot:default>
          <BaseForm v-if="editProduct">
            <BaseInput
              v-model="editProduct.name"
              label="Name"
              required
              placeholder="Product with a Vue"
            />
            <BaseInput v-model="editProduct.location" label="Location" required />
            <BaseInput
              v-model.number="editProduct.price"
              label="Price"
              type="number"
              min="1"
              max="4"
              required
            />
            <BaseInput
              v-model="editProduct.rating"
              label="Rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              required
            />
            <BaseInput v-model="editProduct.description" label="Description" />
            <BaseCheckbox v-model="editProduct.favorite" label="Favorite" />
          </BaseForm>
        </template>
        <template v-slot:actions>
          <BaseButton @click="updateProduct" variant="tonal" color="success">
            Save Changes
          </BaseButton>
          <BaseButton to="/" variant="tonal" color="error" outline>
            Cancel
          </BaseButton>
        </template>
      </BaseCard>
    </template>
  </FormLayout>
</template>

<style></style>
