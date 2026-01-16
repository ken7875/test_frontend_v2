<template>
  <div>
    <label class="block w-fit mb-[3px]" :for="inputId">
      <span>{{ label }}</span>
      <span class="text-danger text-sm inline-block ml-[5px]">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="inputId"
      v-model="inputValue"
      class="w-full bg-transparent border rounded-[4px] py-[5px] px-[15px] placeholder-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      :placeholder="placeholder"
      @input="errorHandler"
      @blur="errorHandler"
    />
    <div class="h-[15px] my-[5px]">
      <p v-show="inputError" :class="['text-danger text-xs']">{{ inputError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  required?: boolean
  placeholder?: string
  value: string | number
}
const { t } = useI18n()
const emit = defineEmits(['update:value'])
const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  required: false,
  id: '',
})

const uuid = useId()
const inputId = computed(() => props.id || uuid)
const placeholder = computed(() => props.placeholder || t('placeHolderDefault'))
const inputError = ref('')

const inputValue = computed({
  get() {
    return props.value
  },
  set(val) {
    emit('update:value', val)
  },
})
const errorHandler = () => {
  if (props.required && !inputValue.value) {
    inputError.value = t('requiredError')
  } else {
    inputError.value = ''
  }
}

defineExpose({
  errorHandler: () => errorHandler(),
})
</script>

<style scoped lang="scss"></style>
