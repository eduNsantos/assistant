import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../assets/img/reactlogo.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { useAuthStore } from "../../store/authStore";

interface Route {
  path: string;
  name: string;
  icon: string;
  layout: string;
  redirect?: boolean;
  upgrade?: boolean;
}

interface SidebarProps {
  color: string;
  image: string;
  routes: Route[];
}

const Sidebar: React.FC<SidebarProps> = ({ color, image, routes }) => {
  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const { user } = useAuthStore();

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={logo} alt="Logo" />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Creative Tim
          </a><br/>
        </div>
        <div>

          <span>Bem vindo, {user?.name}!</span>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    // activeClassName="active" TODO: Arrumar
                  >
                    <i className={`${prop.icon}`} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
