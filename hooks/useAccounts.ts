import * as React from "react";

export type TAccount = {
  access_token: string;
  name: string;
  id: string;
  type: TAccountTypes;
};

export type TAccountTypes = "facebook" | "instagram" | "twitter";

const useAccounts = () => {
  const [data, setData] = React.useState<TAccount[]>([]);

  const getAccount = async (type: TAccountTypes) => {
    const response = await fetch(`/api/${type}/accounts`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };
  const get = async () => {
    const [fbRes, insRes] = await Promise.all([
      getAccount("facebook"),
      getAccount("instagram"),
    ]);

    const fbAccounts: TAccount[] =
      fbRes?.data?.map((e: any) => ({
        ...e,
        type: "facebook",
      })) || [];

    const insAccounts: TAccount[] = insRes
      ? [
          {
            id: fbRes.data[0].instagram_business_account.id,
            name: insRes.username,
            access_token: fbRes.data[0].access_token,
            type: "instagram",
          },
        ]
      : [];
    const data = [...fbAccounts, ...insAccounts];
    setData(data);
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useAccounts;
