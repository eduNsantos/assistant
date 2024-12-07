import Dashboard from "../views/Dashboard";
import UserProfile from "../views/UserProfile";
import TableList from "../views/TableList";

export interface Route {
  upgrade?: boolean;
  path: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  layout: string;
}

const dashboardRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Perfil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/chatbots",
    name: "Chabots",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  }
];

export default dashboardRoutes;
