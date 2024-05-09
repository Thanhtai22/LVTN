import * as services from '../services/dictrict'

export const getDictricts = async (req, res) => {
    try {
        const response = await services.getDictrictsSerivce()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at Dictrict controller: ' + error
        })
    }
}