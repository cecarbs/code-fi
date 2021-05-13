import React from "react";
// Styling
import styled from "styled-components";
import { LibraryMusic } from "@styled-icons/material/LibraryMusic";
// Redux
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  const toggleLibrary = () => {
    dispatch({
      type: "TOGGLE_LIBRARY",
    });
  };

  return (
    <NavbarContainer>
      <LeftContainer>
        <h1>Code-Fi</h1>
        <img
          src="https://cdn2.iconfinder.com/data/icons/pixel-art-large/100/PixelArtIcons-10-512.png"
          alt=""
        />
      </LeftContainer>
      <RightContainerButton onClick={toggleLibrary}>
        Library
        <MusicLibraryIcon />
      </RightContainerButton>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 10vh;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-family: "Press Start 2P", cursive;
    font-size: 1rem;
  }
  img {
    width: 2rem;
    margin-left: 2px;
  }
`;

const RightContainerButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  margin-top: 16px;
  transition: all 0.3 ease;
  &:hover {
    background: #2b2b2b;
    color: white;
    border: none;
  }
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    z-index: 10;
  }
`;

const MusicLibraryIcon = styled(LibraryMusic)`
  width: 1rem;
`;

export default Navbar;
