import React, { useEffect, useRef } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";

import routes from "../routes";

import sidebarImage from "../assets/img/sidebar-3.jpg";
import Can from "../components/Can";

import { Route as CustomRoute} from '../routes/index';

const Admin: React.FC = () => {
  const [image, setImage] = React.useState<string>(sidebarImage);
  const [color, setColor] = React.useState<string>("black");
  const [hasImage, setHasImage] = React.useState<boolean>(true);
  const location = useLocation();
  const mainPanel = useRef<HTMLDivElement>(null);


  const getRoutes = (routes: CustomRoute[]) => {
    return routes.map((prop: CustomRoute, key: number) => {

      if (prop.layout === "/admin") {
        return (
          <Route
            key={key}
            path={prop.path}
            element={(

              <Can key={key} path={prop.path}>
                <prop.component />
              </Can>
            )}
          />

        );
      }

      return null;
    });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (!!document?.scrollingElement?.scrollTop) {
      document.scrollingElement.scrollTop = 0;
    }

    if (mainPanel.current) {
      mainPanel.current.scrollTop = 0;
    }
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      const element = document.getElementById("bodyClick");
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes> {/* Aqui você renderiza as rotas */}
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={setColor}
        image={image}
        setImage={setImage}
      />
    </>
  );
};

export default Admin;
