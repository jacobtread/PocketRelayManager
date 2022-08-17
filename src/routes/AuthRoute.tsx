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

    const setAction = (action: Action) => setState({...state, action, error: ""})
    const setError = (error: string) => setState({...state, error})

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
        setAction(Action.CONNECTING)
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
                    serverVersion: statusResponse.version
                })
            } else {
                setError("Not a KME server")
                setAction(Action.BASE)
            }
        } catch (e) {
            console.error(e)
            setError("Failed to connect to server")
            setAction(Action.BASE)
        }
    }

    async function tryAuthenticate() {
        setAction(Action.AUTHENTICATING)
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
                setError("Not a KME server")
                setAction(Action.CONNECTED)
            }
        } catch (e) {
            console.error(e)
            setError("Failed to authenticate")
            setAction(Action.CONNECTED)
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