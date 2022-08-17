import { FunctionComponent } from "react";
import { useAuth } from "../components/AuthProvider";

const MainRoute: FunctionComponent = () => {
    const {address, token} = useAuth()
    return (
        <div>
            <h1>Main</h1>
            <p>Address: {address}</p>
            <p>Token: {token}</p>
        </div>
    )
}

export default MainRoute