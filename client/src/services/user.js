import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiUserById= (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/user/get/${id}`,
            data: id
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/update-user',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiDeleteUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/v1/user/delete-user',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})