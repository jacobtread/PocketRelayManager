import { FunctionComponent } from "react";
import { useAuth } from "../components/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import "../assets/main.scss"

const MainRoute: FunctionComponent = () => {
    const {address, setToken, setAddress} = useAuth()

    const logout = () => {
        setToken(null)
        setAddress("")
    }

    return (
        <div className="app">
            <div className="sidebar">
                <div className="sidebar__heading">
                    <h1 className="sidebar__title">Pocket Relay</h1>
                    <span className="sidebar__subtitle">Manager <span
                        className="sidebar__address">{address}</span></span>
                </div>
                <nav className="nav">
                    <Link to="/players" className="nav__link">Players</Link>
                    <Link to="/games" className="nav__link">Games</Link>
                    <button onClick={logout} className="nav__link">Logout</button>
                </nav>
            </div>
            <div className="main">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainRoute