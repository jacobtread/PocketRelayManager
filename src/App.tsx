import React from "react";
import "./assets/app.scss"
import AuthProvider, { useAuth } from "./components/AuthProvider";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import RequireAuth from "./components/RequireAuth";
import PlayersRoute from "./routes/PlayersRoute";
import GamesRoute from "./routes/GamesRoute";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/auth" element={<AuthRoute/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<MainRoute/>}>
                        <Route path="/players" element={<PlayersRoute/>}/>
                        <Route path="/games" element={<GamesRoute/>}/>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
