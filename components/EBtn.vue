<template>
  <button class="rounded-md">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
    background-color: var(--color-success);
  }

  // error 紅
  &-error {
    background-color: var(--color-danger);
  }

  // warn 黃
  &-warn {
    background-color: var(--color-warning);
  }
}
</style>
