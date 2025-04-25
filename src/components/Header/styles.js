import styled from 'styled-components';

export const Container = styled.div`
    min-height: 75px;
    z-index: 5;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: ${(props) => (props.changeBackground ? '#000000' : 'transparent')};
    transition: background-color 0.6s ease-in-out;

    img {
        width: 22%;
        cursor: pointer;
    }
`;

export const Menu = styled.div`
    display: flex;
    list-style: none;
    gap: 50px;
`;

export const Li = styled.li`
    position: relative;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;

    a {
        text-decoration: none;
        color: #ffffff;
    }

    &::after {
        content: '';
        height: 3px;
        width: ${(props) => (props.isActive ? '100%' : 0)};
        background-color: #189b20;
        position: absolute;
        bottom: -7px;
        transition: width 0.5s ease-in-out;
        left: 50%;
        transform: translateX(-50%);
    }

    &:hover::after {
        width: 100%;
    }
`;
