import styled from 'styled-components';

export const Background = styled.div`
   height: 100vh;
   width: 100vw;
   z-index: 7;
   background-color:rgba(0, 0, 0, 0.6);
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export const Container = styled.div`
    background: #000000;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    padding: 30px;
    max-width: 1000px;

    iframe {
        border: none;
    }
`;

export const CloseButton = styled.button`
    width: 22px;
    height: 20px;
    background-color: #ff0000;
    color: #ffffff;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    position: absolute;
    top: 6px;
    right: 5px;
    cursor: pointer;
`;
