<template>
  <dialog
    ref="dialog"
    class="w-[80%] md:w-[40%] h-[20%] bg-[#292929] border-1 border-white rounded-md text-white overflow-visible"
  >
    <div class="flex justify-center items-center w-full h-full relative">
      <div
        class="absolute w-[30px] h-[30px] bg-[#292929] text-center top-[-10px] right-[-10px] rounded-[50%] border-1 border-white cursor-pointer"
        @click="close"
      >
        X
      </div>
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null)
const emit = defineEmits(['close'])

defineExpose({
  showModal: () => dialog.value?.showModal(),
  close: () => dialog?.value?.close(),
})
const close = () => {
  dialog.value?.close?.()
  emit('close')
}
</script>
