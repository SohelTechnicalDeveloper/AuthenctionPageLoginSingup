export function Success(result) 
{
    return{
       
        msg:"Success",
        data:result,
        error:""
    }

    
}
export function failure(status,result) 
{
    return{
        status,
        msg:"failed",
        error:result,
        data:""
    }

    
}

export function login(result,token) 
{
    return{
        
        msg:"Login Success",
        error:"",
        data:{result,token}
        // token:token
    }
    
}