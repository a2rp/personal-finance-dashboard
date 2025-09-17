import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Styled } from "./styled";

const NavListCore = () => {
    const navRef = useRef(null);
    const { pathname } = useLocation();

    // Keep the active NavLink centered/visible in the sidebar
    useEffect(() => {
        const el = navRef.current?.querySelector("a.active");
        if (!el) return;

        // small delay so NavLink receives the .active class after route update
        const id = requestAnimationFrame(() => {
            try {
                el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
            } catch {
                // older browsers fallback
                el.scrollIntoView();
            }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    return (
        <Styled.Nav ref={navRef} aria-label="JavaScript Core navigation">
            <h3 style={{ margin: 0 }}>
                <NavLink to="/home" title="Home" style={{ display: "block", padding: 0, margin: 0 }}>Home</NavLink>
                <NavLink to="/overview" title="Overview" style={{ display: "block", padding: 0, margin: 0 }}>Overview</NavLink>
                <NavLink to="/transactions" title="Transactions" style={{ display: "block", padding: 0, margin: 0 }}>Transactions</NavLink>
                <NavLink to="/accounts" title="accounts" style={{ display: "block", padding: 0, margin: 0 }}>Accounts</NavLink>
                <NavLink to="/envelopes" title="Envelopes" style={{ display: "block", padding: 0, margin: 0 }}>Envelopes</NavLink>
            </h3>
        </Styled.Nav>
    );
};

export default NavListCore;
