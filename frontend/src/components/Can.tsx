import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface User {
    id: string,
    name: string,
    role: string,
}

interface Props {
    path: string;
    user?: User | null;
    ifNo?: React.ReactNode;
    children?: React.ReactNode;
}

const permissions: Record<string, string[]> = {
    user: ["/dashboard", "/profile", "/chatbots", "/chatbots/new"]
};

const Can: React.FC<Props> = ({ path, ifNo, children }) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/login" />;
    }
    // Verifica se o usuário tem permissão para acessar o caminho
    const hasAccess = permissions[user?.role]?.includes(path);

    if (!hasAccess) {
        return ifNo ? <>{ifNo}</> : <Navigate to="/login" />;
    }

    return <>{children || null}</>;
};

export default Can