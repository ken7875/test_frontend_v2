// src/api/index.ts
import { Configuration } from '../configuration' // 確保路徑正確
import { UserApi } from '../api/user-api' // 產出的 UserApi 檔案

// 配置 API 基礎設定
const apiConfig = new Configuration({
  basePath: 'https://5556.wu.elitepro.ltd/api', // 這裡填入你的後端地址
  // 如果需要驗證，可以放在這
  // accessToken: () => localStorage.getItem('token') || ''
})

// 導出實例，全專案共用
export const userApi = new UserApi(apiConfig)
