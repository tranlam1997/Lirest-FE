<script setup lang="ts">
import { convertLocaleCodeToLanguage } from '@/common/helpers/locale.helper'
import { useLocaleStore } from '@/common/store/locale.store'

defineProps<{
  active: boolean
}>()
const { availableLocales, locale } = useI18n()
const userStore = useLocaleStore()
const selectedLocale = ref('')
const locales = ref(availableLocales)

const convertToSpecificLanguage = (language: string) => {
  if (language)
    return convertLocaleCodeToLanguage(language)
  return 'English'
}

onMounted(() => {
  selectedLocale.value = userStore.currentLocale
})

watch(selectedLocale, async (newSelectedLocale, oldSelectedLocale) => {
  userStore.$patch({ currentLocale: newSelectedLocale })
  locale.value = locales.value[locales.value.indexOf(newSelectedLocale)]
  locales.value = [...locales.value.filter(l => l !== newSelectedLocale), oldSelectedLocale].filter(item => item)
})
</script>

<template>
  <Transition>
    <select
      v-if="active"
      v-model="selectedLocale" text-xs dark:border="1 white" border="1 black" text-gray-900 dark:text-gray-100
      dark:bg-black
    >
      <option disabled :value="selectedLocale">
        {{ convertToSpecificLanguage(selectedLocale) }}
      </option>
      <option v-for="(locale, index) in locales" :key="`${locale}-${index}`" :value="locale">
        {{ convertToSpecificLanguage(locale) }}
      </option>
    </select>
  </Transition>
</template>

<style scoped>
select {
  width: 40%;
}
.v-enter-active, .v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-from, .v-leave-to {
  width: 0;
}

.v-enter-to, .v-leave-from {
  width: 40%;
}
</style>
