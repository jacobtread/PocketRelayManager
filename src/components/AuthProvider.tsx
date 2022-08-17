import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";

type Token = string | null
type TokenSetter = (token: Token) => void

interface AuthContextType {
    token: Token;
    setToken: TokenSetter;
}

const AuthContext = createContext<AuthContextType>(null!)
const useAuth = (): AuthContextType => useContext(AuthContext)

const AuthProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [token, setToken] = useState<Token>(null);
    let contextValue: AuthContextType = {token, setToken};
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider