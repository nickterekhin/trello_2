import {useState} from "react";

export const useFetch = (callback)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError]=useState('');

    const execute= async (...args)=>{
        try{
            setIsLoading(true);
            await callback(...args);
        }catch(e)
        {
            setError(e.message);
        }finally {
            setIsLoading(false);
        }
    }
    return [execute,isLoading,error];
}