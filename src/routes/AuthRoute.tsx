import { FunctionComponent } from "react";

const AuthRoute: FunctionComponent = () => {
    return (
        <div>
            <h1>Authenticate</h1>
            <input type="text" placeholder="Address"/>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
        </div>
    )
}

export default AuthRoute