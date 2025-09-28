import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { SpinnerPage } from "../Section/SpinnerPage";

export function AuthGuard() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return <SpinnerPage/>;

  return <Outlet />;
}