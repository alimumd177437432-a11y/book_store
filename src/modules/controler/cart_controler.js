import { ErrorHandler } from "../../services/errorhandeler.js"

export const passUserIdMiddelware = ErrorHandler(async(req , res ,next)=> {
    const {id} = req.user
    req.body.userId = id
    next()
})