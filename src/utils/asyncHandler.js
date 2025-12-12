const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}

/*
const asyncHandler=()=>{}
const asyncHandler=(func)=>{()=>{}}
const asyncHandler=(func)=>()=>{}
const asyncHandler=(func)=>async()=>{}
*/
//(err,req,res,next)



/*
const asyncHandler=(fn)=>async (req,resizeBy,next)=>{
    try {
        await fn(req,resizeBy,next)
    } catch (err) {
        resizeBy.status(err.code||500).json({
            success:false,
            message: err.message
        })
    }
}
*/