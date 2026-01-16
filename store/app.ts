import type { MainGetUserInfoResp } from '@/api/model/main-get-user-info-resp'
import { userApi } from '@/api/api-client/user'

export const useAppStore = defineStore('app', () => {
  const userList = ref<MainGetUserInfoResp[]>([])

  const getUserList = async () => {
    const res = await userApi.getUserInfo()
    userList.value = res.data.data || []
  }
  const addUser = async (user: Omit<MainGetUserInfoResp, 'id'>) => {
    try {
      const res = await userApi.createUserInfo({
        name: user.name,
        age: Number(user.age),
      })
      userList.value.push({
        id: res.data.data!.id,
        ...user,
      })
    } catch (error) {
      console.error('add user fail:', error)
      throw error
    }
  }
  const modifyUser = async (data: MainGetUserInfoResp) => {
    try {
      await userApi.updateUserInfo({
        id: data.id,
        name: data.name,
        age: Number(data.age),
      })
      userList.value.forEach((user) => {
        if (user.id === data.id) {
          user.name = data.name
          user.age = data.age
        }
      })
    } catch (error) {
      console.error('add user fail:', error)
      throw error
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await userApi.deleteUserInfo({
        id,
      })
      const index = userList.value.findIndex((user) => user.id === id)
      userList.value.splice(index, 1)
    } catch (error) {
      console.error('add user fail:', error)
      throw error
    }
  }

  return {
    userList,
    addUser,
    getUserList,
    modifyUser,
    deleteUser,
  }
})
