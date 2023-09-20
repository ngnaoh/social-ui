import * as React from "react";

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
    const data = await response.json();
    const accounts: TFBAccount[] = data.data;
    setData(accounts);
    return accounts;
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useFBAccounts;
