import * as services from '../services/user'

export const getUser = async (req, res) => {
    const { userId } = req.params; // Get postId from request parameters
    try {
        const response = await services.getUserByUserId(userId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}

export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const updateUser = async (req, res) => {
    const { id } = req.user
    const payload = req.body
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: 'missing payload in controller'
        })
        const response = await services.updateUser(payload, id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        if (!payload) return res.status(400).json({
            err: 1,
            msg: 'missing payload in controller'
        })

        const response = await services.deleteUser(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}