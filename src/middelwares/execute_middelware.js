export const execute = async(req,res)=>{
    const meta = req.meta
    const result = await req.Query 
    res.status(200).json({
        message: "success",
        meta : meta,
        data: result,
    })
}