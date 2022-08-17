import { ChangeEvent, FunctionComponent, ReactNode, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

enum Action {
    BASE,
    CONNECTING,
    CONNECTED,
    AUTHENTICATING
}

interface AuthState {
    action: Action
    error: string;
    serverVersion: string;
    username: string;
    password: string;
}


export interface StatusResponse {
    identity: string;
    version: string;
}

export interface AuthResponse {
    success: string;
    token: string;
}

const AuthRoute: FunctionComponent = () => {
    const {request, address, setAddress, setToken} = useAuth()
    const navigate = useNavigate()

    const [state, setState] = useState<AuthState>({
        action: Action.BASE,
        error: "",
        serverVersion: "",
        username: "",
        password: ""
    });

    const onStateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const {name, value} = target
        setState({
            ...state,
            [name]: value
        })
    }

    const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }

    const tryConnectAddress = async () => {
        setState({...state, action: Action.CONNECTING, error: ""})
        // TODO: Validate address
        try {
            const statusResponse = await request<StatusResponse>({
                method: "GET",
                path: "status"
            })
            if (statusResponse.identity === "KME_SERVER") {
                setState({
                    ...state,
                    action: Action.CONNECTED,
                    serverVersion: statusResponse.version,
                })
            } else {
                setState({...state, action: Action.BASE, error: "Not a KME server"})
            }
        } catch (e) {
            console.error(e)
            setState({...state, action: Action.BASE, error: "Failed to connect to server"})
        }
    }

    async function tryAuthenticate() {
        setState({...state, action: Action.AUTHENTICATING, error: ""})
        const {username, password} = state
        try {
            const authResponse = await request<AuthResponse>({
                method: "POST",
                path: "auth",
                body: {username, password}
            })
            if (authResponse.success) {
                setToken(authResponse.token)
                navigate("/")
                return
            } else {
                setState({...state, action: Action.CONNECTED, error: "Invalid credentials"})
            }
        } catch (e) {
            console.error(e)
            setState({...state, action: Action.CONNECTED, error: "Failed to authenticate"})
        }
    }

    const Content = (): ReactNode => {
        switch (state.action) {
            case Action.BASE:
                return (
                    <div>
                        <label>
                            <span>Server Address</span>
                            <input type="text"
                                   name="address"
                                   onChange={onAddressChange}
                                   value={address}/>
                        </label>

                        <button onClick={tryConnectAddress}>
                            Connect
                        </button>
                    </div>
                )
            case Action.CONNECTING:
                return (<p>Connecting...</p>)
            case Action.CONNECTED:
                return (
                    <div>
                        <p>Connected to server v{state.serverVersion}</p>
                        <label>
                            <span>Username</span>
                            <input type="text"
                                   name="username"
                                   onChange={onStateChange}
                                   value={state.username}/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password"
                                   name="password"
                                   onChange={onStateChange}
                                   value={state.password}/>
                        </label>
                        <button onClick={tryAuthenticate}>
                            Authenticate
                        </button>
                    </div>
                )
            case Action.AUTHENTICATING:
                return (<p>Authenticating...</p>)
        }
    }

    return (
        <div>
            <h1>Authenticate</h1>
            {state.error.length > 0 && (
                <p>{state.error}</p>
            )}
            {Content()}
        </div>
    )
}

export default AuthRoute