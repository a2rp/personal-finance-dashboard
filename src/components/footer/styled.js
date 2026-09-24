import styled from "styled-components";

const Wrapper = styled.footer`
    display: grid;
    gap: 22px;
    padding: 26px 22px 20px;
    color: #91a7bf;
    background: linear-gradient(135deg, #07101d, #0a1727);
    border: 1px solid rgba(142, 171, 205, 0.18);
    border-radius: 18px;
`;

const Intro = styled.div`
    display: grid;
    gap: 5px;
    strong {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #f2f7fc;
        font-size: 15px;
        svg { color: #79b8ff; }
    }
    span { font-size: 12px; }
`;

const Groups = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 22px;
`;

const Group = styled.div` display: grid; gap: 10px; `;

const GroupTitle = styled.span`
    color: #aac3dc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
`;

const Links = styled.div` display: flex; flex-wrap: wrap; gap: 8px; `;

const IconLink = styled.a`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    color: #aac0d7;
    border: 1px solid rgba(142, 171, 205, 0.28);
    border-radius: 10px;
    transition: color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, text-shadow 180ms ease;
    &:hover,
    &:focus-visible {
        color: #79b8ff;
        border-color: #79b8ff;
        box-shadow: 0 0 18px rgba(64, 139, 220, 0.2);
        text-shadow: 0 0 12px rgba(121, 184, 255, 0.45);
        outline: none;
    }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 15px;
    color: #71869e;
    border-top: 1px solid rgba(142, 171, 205, 0.14);
    font-size: 12px;
    a {
        color: #d9eaff;
        font-weight: 700;
        text-decoration: none;
        &:hover { color: #79b8ff; text-shadow: 0 0 12px rgba(121, 184, 255, 0.45); }
    }
`;

export const Styled = { Wrapper, Intro, Groups, Group, GroupTitle, Links, IconLink, Bottom };
