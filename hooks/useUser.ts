import React from "react";
import { useCookies } from "react-cookie";

export type TUser = {
  accessCode: string;
  facebookToken: string;
  id: string;
  phone: string;
};

const useUser = () => {
  const [user, setUser] = React.useState<TUser | null>(null);
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const retrieveUser = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/v1/users/profile",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + cookies.accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const result = data.data as TUser;
    setUser(result);
    return result;
  };

  async function refetch() {
    return await retrieveUser();
  }

  React.useEffect(() => {
    retrieveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { user, refetch };
};

export default useUser;
