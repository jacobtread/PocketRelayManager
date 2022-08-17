import { FunctionComponent } from "react";
import { useAuth } from "../components/AuthProvider";
import { Link, Outlet } from "react-router-dom";

const MainRoute: FunctionComponent = () => {
    const {address, setToken, setAddress} = useAuth()

    const logout = () => {
        setToken(null)
        setAddress("")
    }

    return (
        <div>
            <header className="header">
                <div className="header__content">
                    <h1 className="header__title">Pocket Relay</h1>
                    <span className="header__subtitle">Manager <span className="header__address">{address}</span></span>
                </div>
                <nav className="nav">
                    <Link to="/players" className="nav__link">Players</Link>
                    <Link to="/games" className="nav__link">Games</Link>
                    <div className="nav__end">
                        <button onClick={logout} className="nav__link">Logout</button>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainRoute