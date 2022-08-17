import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";

type Address = string
type Token = string | null


type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestData {
    method: RequestMethod;
    path: string;
    body?: any;
}

interface AuthContextType {
    address: Address;
    token: Token;
    setAddress: (value: Address) => void;
    setToken: (value: Token) => void;
    request: RequestFunction
}

type RequestFunction = <T>(requestData: RequestData) => Promise<T>


const AuthContext = createContext<AuthContextType>(null!)
const useAuth = (): AuthContextType => useContext(AuthContext)

interface CheckTokenResponse {
    valid: boolean
}

const AuthProvider: FunctionComponent<PropsWithChildren> = ({children}) => {

    const [address, setAddress] = useState<Address>(localStorage.getItem("kme-address") ?? "");
    const [token, setToken] = useState<Token>(localStorage.getItem("kme-token"));

    async function checkLoadedToken() {
        try {
            const response = await request<CheckTokenResponse>({
                method: "POST",
                path: "checkToken",
                body: {token}
            })

            if (!response.valid) {
                setToken(null)
                localStorage.removeItem("kme-token")
            }
        } catch (e) {
            console.error(e)
            setToken(null)
            localStorage.removeItem("kme-token")
        }
    }

    useEffect(() => {
        if (address.length > 0 && token !== null) {
            checkLoadedToken().then().catch()
        }
    })

    useEffect(() => {
        if (token != null) {
            localStorage.setItem("kme-address", address)
            localStorage.setItem("kme-token", token)
        }
    }, [address, token])

    async function request<T>(requestData: RequestData): Promise<T> {
        if (address.length < 1) {
            throw new Error("Missing server address")
        }
        const init: RequestInit = {method: requestData.method}
        const headers: Record<string, string> = {}
        if (token != null) {
            headers["X-Token"] = token
        }
        if (requestData.method !== "GET" && requestData.body !== null) {
            headers["Content-Type"] = "application/json"
            init.body = JSON.stringify(requestData.body)
        }
        init.headers = headers
        const response = await fetch(`http://${address}/api/${requestData.path}`, init)
        return await response.json()
    }

    let contextValue: AuthContextType = {address, token, setAddress, setToken, request};
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider