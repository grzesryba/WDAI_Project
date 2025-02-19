import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {PrivateRoute} from "./components/PrivateRoute";
import {Login} from "./components/Login";
import {AdminPanel} from "./components/AdminPanel";
import {AuthProvider} from "./components/AuthContext";
import {ProjectsProvider} from "./components/ProjectsContext";
import {ScrollToTop} from "./components/ScrollToTop";
import ProjectDetails from "./components/ProjectDetails"
import "./App.css";

function App() {
    useEffect(() => {
        //Inicjalizacja AOS (biblioteka od animacji)
        AOS.init({
            duration: 1000,
            once: true,
            // Wylaczenie animacji na mobilkach
            disable: "mobile",
            startEvent: "load",
        });
    }, []);
    return (
        <AuthProvider>
                <BrowserRouter>
                    <div>
                        <ScrollToTop></ScrollToTop>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/projects" element={<Projects/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/admin" element={<Login/>}/>
                            <Route path="/project/:id" element={<ProjectDetails/>}/>
                            <Route
                                path="/admin-page"
                                element={
                                    <PrivateRoute>
                                        <AdminPanel/>
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                        <Footer/>
                    </div>
                </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
