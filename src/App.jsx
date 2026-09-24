import ScrollToTop from "./components/ScrollToTop";
import { Styled } from "./App.styled";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CircularProgress } from "@mui/material";
import Footer from "./components/footer";
import NavList from "./components/navList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/home"));
const NotFound = lazy(() => import("./pages/notFound"));
const About = lazy(() => import("./pages/about"));
const Overview = lazy(() => import("./pages/overview"));
const Transactions = lazy(() => import("./pages/transactions"));
const Accounts = lazy(() => import("./pages/accounts"));
const Envelopes = lazy(() => import("./pages/envelopes"));

const App = () => {
    const [displayNav, setDisplayNav] = useState(true);
    const { pathname } = useLocation();

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.Brand as={NavLink} to="/" aria-label="Personal Finance Dashboard home">
                    <Styled.BrandLogo src="/personal-finance-dashboard/logo.png" alt="Ashish Ranjan logo" />
                    <Styled.BrandCopy>
                        <Styled.BrandKicker>LOCAL FINANCE TOOL</Styled.BrandKicker>
                        <Styled.BrandTitle>Personal Finance Dashboard</Styled.BrandTitle>
                    </Styled.BrandCopy>
                </Styled.Brand>
                <Styled.NavLinkWrapper
                    type="button"
                    aria-label={displayNav ? "Hide navigation" : "Show navigation"}
                    aria-expanded={displayNav}
                    onClick={() => setDisplayNav((visible) => !visible)}
                >
                    {displayNav ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </Styled.NavLinkWrapper>
            </Styled.Header>

            <Styled.Main>
                <Styled.NavWrapper className={displayNav ? "active" : ""}>
                    <div className="navInner">
                        <NavList />
                    </div>
                </Styled.NavWrapper>

                <Styled.ContentWrapper id="scroll-root" data-scroll-root>
                    <Styled.RoutesWrapper>
                        <Suspense
                            key={pathname}
                            fallback={
                                <Styled.Loading aria-live="polite">
                                    <CircularProgress size={24} />
                                    <span>Loading page...</span>
                                </Styled.Loading>
                            }
                        >
                            <Routes>
                                <Route path="/" element={<Navigate to="/home" replace />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/overview" element={<Overview />} />
                                <Route path="/transactions" element={<Transactions />} />
                                <Route path="/accounts" element={<Accounts />} />
                                <Route path="/envelopes" element={<Envelopes />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </Styled.RoutesWrapper>

                    <Styled.Footer>
                        <Footer />
                    </Styled.Footer>
                </Styled.ContentWrapper>
            </Styled.Main>

            <ScrollToTop />
            <ToastContainer position="bottom-center" autoClose={4000} newestOnTop />
        </Styled.Wrapper>
    );
};

export default App;
