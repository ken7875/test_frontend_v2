# UserApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserInfo**](#createuserinfo) | **POST** /user | 創建用戶|
|[**deleteUserInfo**](#deleteuserinfo) | **DELETE** /user | 刪除用戶|
|[**getUserInfo**](#getuserinfo) | **GET** /user | 取得用戶清單|
|[**updateUserInfo**](#updateuserinfo) | **PUT** /user | 修改用戶資訊|

# **createUserInfo**
> CreateUserInfo200Response createUserInfo(request)


### Example

```typescript
import {
    UserApi,
    Configuration,
    MainCreateUserInfoReq
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let request: MainCreateUserInfoReq; //request body

const { status, data } = await apiInstance.createUserInfo(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **MainCreateUserInfoReq**| request body | |


### Return type

**CreateUserInfo200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUserInfo**
> MainResponse deleteUserInfo(request)


### Example

```typescript
import {
    UserApi,
    Configuration,
    MainDeleteUserInfoReq
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let request: MainDeleteUserInfoReq; //request body

const { status, data } = await apiInstance.deleteUserInfo(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **MainDeleteUserInfoReq**| request body | |


### Return type

**MainResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserInfo**
> GetUserInfo200Response getUserInfo()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.getUserInfo();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserInfo200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserInfo**
> MainResponse updateUserInfo(request)


### Example

```typescript
import {
    UserApi,
    Configuration,
    MainUpdateUserInfoReq
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let request: MainUpdateUserInfoReq; //request body

const { status, data } = await apiInstance.updateUserInfo(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **MainUpdateUserInfoReq**| request body | |


### Return type

**MainResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

