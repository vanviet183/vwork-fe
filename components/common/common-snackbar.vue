<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    location="top"
    :color="alertMessage?.type === AlertType.success ? 'green' : 'red'"
  >
    <div class="flex flex-row">
      <v-icon
        :icon="
          alertMessage?.type === AlertType.success
            ? 'mdi-check-circle'
            : 'mdi-close-circle'
        "
      />
      <div class="ms-3">
        {{ alertMessage?.message ?? '' }}
      </div>
    </div>

    <template #actions>
      <v-btn variant="text" @click="dismissSnackbar">
        <v-icon icon="mdi-close" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { AlertType } from '~/constants'
import { useAlertStore } from '~/stores/alert/alert-store'

const alertStore = useAlertStore()
const { alertMessage } = storeToRefs(alertStore)

const snackbar = ref(false)

watch(alertMessage, () => {
  if (alertMessage.value?.message) {
    snackbar.value = true
  }
})

function dismissSnackbar() {
  snackbar.value = false
}
</script>
