import db from '../models'

export const getDictrictsSerivce = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Dictrict.findAll({
            raw: true,
            attributes: ['code', 'value']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Districts.',
            response
        })
    } catch (error) {
        reject(error)
    }
})