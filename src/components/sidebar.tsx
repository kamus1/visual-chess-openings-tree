import styled from "styled-components";
import logo from "../assets/react.svg";
import { v } from "../styles/variables";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

// icons
import { AiOutlineMenu, AiOutlineHome } from "react-icons/ai";

export function SideBar({ sideBarOpen, setSideBarOpen }) {
  const { setTheme, theme } = useContext(ThemeContext);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Container $isOpen={sideBarOpen} $themeUse={theme}>
      <button className="sidebarButton" onClick={() => setSideBarOpen(!sideBarOpen)}>
        <AiOutlineMenu />
      </button>
      <div className="logoContainer">
        <div className="imgcontent">
          <img src={logo} />
        </div>
        <h3>Chess Openings Tree</h3>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink to={to} className={({ isActive }) => `Links ${isActive ? "active" : ""}`}>
            <div className="LinkIcon">{icon}</div>
            {sideBarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      <div className="Themecontent">
        {sideBarOpen && <span>Dark Mode</span>}
        <div className="Togglecontent">
          <div className="grid theme-container">
            <div className="content">
              <div className="demo">
                <label className="switch">
                  <input
                    checked={theme === "dark"}
                    type="checkbox"
                    className="theme-switcher"
                    onChange={toggleTheme}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/visual-chess-openings-tree/",
  },
];

interface ContainerProps {
  $isOpen: boolean;
  $themeUse: string;
}
const Container = styled.div<ContainerProps>`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: sticky;
  padding-top: 20px;
  .sidebarButton {
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.text};
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3}, 0 0 7px ${(props) => props.theme.bg3};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    border: none;
    letter-spacing: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
  }

  .logoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing};
    .imgcontent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s ease;
      transform: ${({ $isOpen }) => ($isOpen ? "scale(0.7)" : "scale(1.0)")};
    }

    h3 {
      display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    }
  }

  .LinkContainer {
    margin: 8px 0;
    :hover {
      background: ${(props) => props.theme.bg3};

    }

    .Links {
      padding: 0 15%;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height:50px;
      .LinkIcon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }

      &.active {
        .LinkIcon {
          svg {
            color: ${(props) => props.theme.primary};
          }
        }
      }
    }
  }

  .Themecontent {
    padding-left: 15%;
    display: flex;
    align-items: center;
    span {
      display: block;
      padding: 10px;
      font-weight: 700;
    }

    .Togglecontent {
      margin: ${({ $isOpen }) => ($isOpen ? "auto 40px" : "auto 15px")};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      

      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: all 0.4s;
        

        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }

        .demo {

          /*hide slider*/ display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

          padding: 0%;
          font-size: 32px;
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;

            .theme-switcher {
              opacity: 0;
              width: 0;
              height: 0;

              &:checked + .slider:before {
                left: 8px;
                content: "♕";
                transform: translateX(26px);
              }
            }

            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ $themeUse }) =>
                $themeUse === "light" ? v.lightcheckbox : v.checkbox};
              transition: 0.4s;

              &::before {
                position: absolute;
                content: "♕";
                height: 0px;
                width: 0px;
                left: -8px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }

              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.bg3};
  margin: ${v.mdSpacing} 0;
`;
