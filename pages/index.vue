<template>
  <div class="bg-[#292929] h-screen overflow-scroll flex justify-center items-center text-white">
    <div class="w-[90%] md:w-[70%] xl:w-[50%]">
      <form>
        <fieldset
          class="border-2 border-white border-solid rounded-lg p-[30px] w-full mb-[20px] px-[20px] md:px-[45px] md:px-[80px] lg:px-[100px]"
        >
          <h2 class="text-white text-[25px] text-bold text-center">{{ $t('operate') }}</h2>
          <ETextField
            ref="nameInput"
            v-model:value="form.name"
            :placeholder="'請輸入名字'"
            :label="$t('name')"
            type="text"
            class="w-full"
            :required="true"
          />
          <ETextField
            ref="ageInput"
            v-model:value.number="form.age"
            :placeholder="'請輸入年齡'"
            :label="$t('age')"
            type="number"
            class="w-full"
            :required="true"
          />
          <div class="mt-[30px] float-end">
            <EBtn
              type="button"
              :class="[
                'w-[60px] h-[30px]',
                formOperatingMode === 'add' ? 'e-btn-warn' : 'e-btn-success',
              ]"
              @click="formValidator()"
              >{{ $t(formOperatingMode) }}</EBtn
            >
          </div>
        </fieldset>
      </form>
      <div
        class="border-2 border-white border-solid rounded-lg p-[30px] w-full px-[20px] md:px-[45px] md:px-[80px] lg:px-[100px] h-[400px]"
      >
        <ul class="grid grid-cols-4 mb-[15px] text-center w-full h-[12%]">
          <li>#</li>
          <li>{{ $t('name') }}</li>
          <li>{{ $t('age') }}</li>
          <li>{{ $t('operate') }}</li>
        </ul>
        <div class="overflow-scroll h-[78%]">
          <ul
            v-for="user in appStore.userList"
            :key="user.id"
            class="grid grid-cols-4 border-b border-b-solid border-b-white pb-[20px] mb-[20px] text-center"
          >
            <li>{{ user.id }}</li>
            <li>{{ user.name }}</li>
            <li>{{ user.age }}</li>
            <li class="flex justify-center flex-nowrap w-full">
              <div class="block md:hidden w-full relative">
                <EBtn
                  class="w-full px-[5px] h-[30px] e-btn-success mr-[5px] mb-[5px]"
                  @click="openMobileOperateMenu(user.id!)"
                  >{{ $t('operate') }}</EBtn
                >
                <div
                  v-show="mobileOperateOpenId === user.id"
                  class="absolute z-[10] bg-white p-[10px]"
                >
                  <EBtn
                    class="w-full px-[5px] h-[30px] e-btn-success mr-[5px] mb-[5px]"
                    @click="modifyUserHandler(user)"
                    >{{ $t('modify') }}</EBtn
                  >
                  <EBtn
                    class="w-full w-fit px-[5px] h-[30px] e-btn-error"
                    @click="deleteUserHandler(user.id)"
                    >{{ $t('delete') }}</EBtn
                  >
                </div>
              </div>
              <div class="hidden md:flex">
                <EBtn
                  class="md:w-[50%] px-[5px] h-[30px] e-btn-success mr-[5px]"
                  @click="modifyUserHandler(user)"
                  >{{ $t('modify') }}</EBtn
                >
                <EBtn
                  class="md:w-[50%] w-fit px-[5px] h-[30px] e-btn-error"
                  @click="deleteUserHandler(user.id)"
                  >{{ $t('delete') }}</EBtn
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 確認dialog -->
    <EDialog ref="confirmDialog" @close="closeConfirmDialog">
      <div>
        <div>
          <p class="mb-[20px]">{{ $t('confirmMessage', { operatingMode: $t(operatingMode) }) }}</p>
          <div class="flex">
            <EBtn class="w-full px-[5px] h-[30px] e-btn-success mr-[5px]" @click="send">{{
              $t('confirm')
            }}</EBtn>
            <EBtn
              class="w-full px-[5px] h-[30px] e-btn-error mr-[5px]"
              @click="closeConfirmDialog"
              >{{ $t('cancel') }}</EBtn
            >
          </div>
        </div>
      </div>
    </EDialog>
    <!-- 成功 dialog -->
    <EDialog ref="resultDialog">
      <div class="content">
        <p>{{ isLoading ? 'loading...' : $t('success') }}</p>
      </div>
    </EDialog>
  </div>
</template>

<script setup lang="ts">
import EDialog from '@/components/EDialog.vue'
import { userApi } from '@/api/api-client/user'
import type ETextField from '~/components/ETextField.vue'
import { useAppStore } from '@/store/app'
import type { MainGetUserInfoResp } from '@/api/model/main-get-user-info-resp'

type Mode = 'add' | 'modify' | 'delete'

const appStore = useAppStore()
const isLoading = ref(false)

const operatingMode = ref<Mode>('add')
const formOperatingMode = ref<'add' | 'modify'>('add')

watch(operatingMode, (newVal, oldVal) => {
  if (newVal !== 'add' && newVal !== 'modify') {
    formOperatingMode.value = oldVal as 'add' | 'modify'
  } else {
    formOperatingMode.value = newVal
  }
})

const mobileOperateOpenId = ref(-1)
const form = ref<{
  id?: number
  name: string
  age: number | ''
}>({
  id: -1,
  name: '',
  age: '',
})
await callOnce('getUsers', () => appStore.getUserList())

const confirmDialog = ref<InstanceType<typeof EDialog> | null>(null)
const resultDialog = ref<InstanceType<typeof EDialog> | null>(null)
const resetForm = () => {
  form.value.name = ''
  form.value.age = ''
  form.value.id = -1
}
const add = async () => {
  isLoading.value = true
  try {
    await appStore.addUser({
      name: form.value.name,
      age: Number(form.value.age),
    })
    resultDialog.value?.showModal?.()
    resetForm()
  } finally {
    isLoading.value = false
  }
}

const modify = async () => {
  if (!Number.isInteger(form.value.id)) {
    console.error(`需提供編輯 id`)
    return
  }

  isLoading.value = true

  try {
    await appStore.modifyUser({
      id: form.value.id!,
      name: form.value.name,
      age: Number(form.value.age),
    })
    resultDialog.value?.showModal?.()
    resetForm()
  } finally {
    isLoading.value = false
  }
}

const nameInput = ref<InstanceType<typeof ETextField> | null>(null)
const ageInput = ref<InstanceType<typeof ETextField> | null>(null)

const openConfirmDialog = () => {
  confirmDialog.value?.showModal?.()
}
const closeConfirmDialog = () => {
  confirmDialog.value?.close?.()
  operatingMode.value = 'add'
  resetForm()
}

const formValidator = () => {
  if (!form.value.name || !Number.isInteger(form.value.age)) {
    if (!form.value.name) {
      nameInput.value?.errorHandler()
    }

    if (!Number.isInteger(form.value.age)) {
      ageInput.value?.errorHandler()
    }

    return
  }

  openConfirmDialog()
}

const deleteUserHandler = (id: number) => {
  operatingMode.value = 'delete'
  openConfirmDialog()
  form.value.id = id
  mobileOperateOpenId.value = -1
}

const modifyUserHandler = (user: MainGetUserInfoResp) => {
  operatingMode.value = 'modify'
  form.value.id = user.id
  form.value.name = user.name
  form.value.age = user.age
  mobileOperateOpenId.value = -1
}

const deleteUser = async () => {
  if (!Number.isInteger(form.value.id)) {
    console.error(`需提供編輯 id`)
    return
  }

  isLoading.value = true

  try {
    await appStore.deleteUser(form.value.id!)
    resultDialog.value?.showModal?.()
  } finally {
    isLoading.value = false
  }
}

const send = () => {
  switch (operatingMode.value) {
    case 'add':
      add()
      break
    case 'modify':
      modify()
      break
    case 'delete':
      deleteUser()
      break
  }
  closeConfirmDialog()
}

const openMobileOperateMenu = (id: number) => {
  if (mobileOperateOpenId.value === id) {
    mobileOperateOpenId.value = -1
  } else {
    mobileOperateOpenId.value = id
  }
}
</script>

<style lang="scss" scoped></style>
