import React from "react";

export type TFBAccount = {
  access_token: string;
  name: string;
  id: string;
};

const useFBAccounts = () => {
  const [data, setData] = React.useState<TFBAccount[]>([]);

  const get = async () => {
    const response = await fetch("/api/fb/accounts", {
      method: "GET",
    });
    const data: TFBAccount[] = await response.json();
    setData(data);
    return data;
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useFBAccounts;
