export const useFetch = () => {
  const fetchData = async (
    endpoint: string,
    method: string | undefined,
    body: object | undefined,
    token: string | undefined
  ) => {
    const res: Response = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    let returnValue: { ok: boolean; data: any };
    // declared returnValue type here but if this throws error change it back to
    // let returnValue = {};

    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
        // console.log("1");
      } else {
        returnValue = { ok: true, data };
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages: string[] = data.errors.map(
          (item: any) => item.message || item.msg
        );
        returnValue = { ok: false, data: messages };
        // console.log("2");
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
        // console.log("3");
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occured" };
      }
    }

    return returnValue;
  };

  return fetchData;
};
