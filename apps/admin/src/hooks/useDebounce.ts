import { useEffect, useState } from "react"

const useDebounce = (input: string, timeout: number) => {

    const [value, setValue] = useState(input);

    useEffect(()=>{
        const debounce = setTimeout(()=>{
            setValue(input);
        },timeout);
        return ()=>{
            clearTimeout(debounce);
        }
    },[input])
    
    return value
}

export default useDebounce