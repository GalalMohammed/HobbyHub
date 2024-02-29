import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        try {
            setError(null)
            setIsLoading(true)

            let res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            console.log("data", data);
            localStorage.setItem('user', JSON.stringify(data))
            if (res.ok)
                dispatch({ type: 'LOGIN', payload: data })
            if (!res.ok) {
                console.log("error", data.error);
                setError(data.error);
            }
        } catch (e) {
            console.log(e);
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    return { error, isLoading, login }
}

export default useLogin