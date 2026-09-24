import React from "react";
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiCreditCard, FiHome, FiList, FiPieChart, FiTarget } from "react-icons/fi";
import { Styled } from "./styled";

const links = [
    { to: "/home", label: "Home", icon: FiHome },
    { to: "/overview", label: "Overview", icon: FiPieChart },
    { to: "/transactions", label: "Transactions", icon: FiList },
    { to: "/accounts", label: "Accounts", icon: FiCreditCard },
    { to: "/envelopes", label: "Envelopes", icon: FiTarget },
];

export default function NavList() {
    const navRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const active = navRef.current?.querySelector("a.active");
        if (!active) return;
        const frame = requestAnimationFrame(() => active.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" }));
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return (
        <Styled.Nav ref={navRef} aria-label="Dashboard navigation">
            <Styled.NavKicker>WORKSPACE</Styled.NavKicker>
            {links.map(({ to, label, icon: Icon }) => (
                <Styled.NavItem key={to} as={NavLink} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                    {React.createElement(Icon, { "aria-hidden": "true" })}
                    <span>{label}</span>
                </Styled.NavItem>
            ))}
        </Styled.Nav>
    );
}
