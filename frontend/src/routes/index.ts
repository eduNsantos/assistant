import Dashboard from "../views/Dashboard";
import UserProfile from "../views/UserProfile";
import TableList from "../views/TableList";
import Typography from "../views/Typography";
import Icons from "../views/Icons";
import Maps from "../views/Maps";
import Notifications from "../views/Notifications";
import Upgrade from "../views/Upgrade";

interface Route {
  upgrade?: boolean;
  path: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  layout: string;
}

const dashboardRoutes: Route[] = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "fas fa-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "fas fa-map",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "fa-solid fa-user",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
