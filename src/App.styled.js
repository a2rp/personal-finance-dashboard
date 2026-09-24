import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div` position: relative; min-height: 100vh; background: #050b14; color: #d9e6f4; `,
    Header: styled.header`
        position: fixed;
        inset: 0 0 auto;
        z-index: 50;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 10px clamp(16px, 3vw, 32px);
        border-bottom: 1px solid rgba(142, 171, 205, 0.2);
        background: rgba(5, 11, 20, 0.94);
        backdrop-filter: blur(16px);
    `,
    Brand: styled.a`
        display: inline-flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        color: #f4f8fc;
        text-decoration: none;
        &:hover .brandTitle, &:focus-visible .brandTitle { text-shadow: 0 0 14px rgba(121, 184, 255, 0.55); }
        &:focus-visible { outline: 2px solid #79b8ff; outline-offset: 4px; }
    `,
    BrandLogo: styled.img`
        width: 42px;
        height: 42px;
        object-fit: contain;
        flex: 0 0 auto;
        border: 1px solid rgba(142, 171, 205, 0.35);
        border-radius: 12px;
        background: #0c1a2b;
    `,
    BrandCopy: styled.span` display: grid; min-width: 0; gap: 1px; `,
    BrandKicker: styled.span` color: #79b8ff; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; `,
    BrandTitle: styled.span.attrs({ className: "brandTitle" })` overflow: hidden; color: #f4f8fc; font-family: "Antonio", sans-serif; font-size: clamp(17px, 2.4vw, 23px); text-overflow: ellipsis; white-space: nowrap; transition: text-shadow 180ms ease; `,
    NavLinkWrapper: styled.button`
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        padding: 0;
        color: #d9e6f4;
        background: #0c1a2b;
        border: 1px solid rgba(142, 171, 205, 0.32);
        border-radius: 10px;
        cursor: pointer;
        transition: color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        &:hover, &:focus-visible { color: #79b8ff; border-color: #79b8ff; box-shadow: 0 0 18px rgba(64, 139, 220, 0.2); outline: none; }
        svg { width: 20px; height: 20px; }
    `,
    Main: styled.div` height: 100vh; padding-top: 70px; display: flex; align-items: stretch; overflow: hidden; `,
    NavWrapper: styled.aside`
        width: 0;
        flex: 0 0 0;
        overflow: hidden;
        z-index: 40;
        background: #07101d;
        border-right: 1px solid rgba(142, 171, 205, 0.18);
        transition: width 180ms ease, flex-basis 180ms ease;
        &.active { width: 270px; flex-basis: 270px; }
        .navInner { width: 270px; height: 100%; padding: 18px 14px; overflow-y: auto; scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: rgba(142, 171, 205, 0.35) transparent; &::-webkit-scrollbar { width: 10px; height: 10px; } &::-webkit-scrollbar-thumb { background: rgba(142, 171, 205, 0.28); border-radius: 999px; border: 3px solid transparent; background-clip: content-box; } }
        @media (max-width: 1000px) {
            position: fixed;
            top: 70px;
            left: 0;
            height: calc(100vh - 70px);
            box-shadow: 18px 0 45px rgba(0, 0, 0, 0.25);
        }
    `,
    ContentWrapper: styled.section`
        width: 100%;
        min-width: 0;
        overflow: auto;
        scroll-behavior: smooth;
        scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: rgba(142, 171, 205, 0.35) transparent; &::-webkit-scrollbar { width: 10px; height: 10px; } &::-webkit-scrollbar-thumb { background: rgba(142, 171, 205, 0.28); border-radius: 999px; border: 3px solid transparent; background-clip: content-box; }
    `,
    RoutesWrapper: styled.div` min-height: 100%; `,
    Loading: styled.div` min-height: 60vh; display: grid; place-content: center; justify-items: center; gap: 10px; color: #9eb3ca; `,
    Footer: styled.div` padding: 0 20px 20px; `,
};
