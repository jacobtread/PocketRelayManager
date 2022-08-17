import React from "react";
import "./assets/App.css";
import AuthProvider from "./components/AuthProvider";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <AuthProvider>
            <h1>KME Manager</h1>
            <Routes>
                <Route path="/auth" element={<AuthRoute/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<MainRoute/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
