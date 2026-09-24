import styled from "styled-components";

const Nav = styled.nav`
    display: grid;
    gap: 7px;
`;

const NavKicker = styled.span`
    padding: 2px 12px 10px;
    color: #79b8ff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
`;

const NavItem = styled.a`
    display: flex;
    align-items: center;
    gap: 11px;
    min-height: 44px;
    padding: 9px 12px;
    color: #91a7bf;
    border: 1px solid transparent;
    border-radius: 11px;
    text-decoration: none;
    transition: color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, text-shadow 180ms ease;
    svg { width: 17px; height: 17px; flex: 0 0 auto; }
    &:hover,
    &:focus-visible,
    &.active {
        color: #f1f7fd;
        border-color: rgba(121, 184, 255, 0.42);
        box-shadow: 0 0 18px rgba(64, 139, 220, 0.16);
        text-shadow: 0 0 12px rgba(121, 184, 255, 0.35);
        outline: none;
    }
    &.active { background: rgba(121, 184, 255, 0.1); }
`;

export const Styled = { Nav, NavKicker, NavItem };
