<script setup lang="ts">
const selectLocaleStatus = ref(false)

const changeSelectLocaleStatus = () => {
  selectLocaleStatus.value = !selectLocaleStatus.value
}
</script>

<template>
  <nav text-xl gap-3>
    <IconHome />
    <IconToggleDarkMode />
    <IconLocale @click.prevent="changeSelectLocaleStatus()" />
    <InputSelectLocale :active="selectLocaleStatus" />
    <IconAbout />
    <IconGithub />
  </nav>
</template>

<style scoped lang="scss">
</style>
