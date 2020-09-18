export const fetchValidation = async (token, dispatch) => {
    console.log("FETCH");
    const options = {
        method: "POST",
        body: JSON.stringify({ access_token: token }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("/api/token/validate", options);
    const json = await result.json();
    const emit = statusCodeCheck(json);

    return dispatch({ ...emit });
};

const statusCodeCheck = (json) => {
    console.log(json.statusCode);
    switch (json.statusCode) {
        case 200:
            return {
                type: "VALIDATED",
                payload: json.user
            };
        case 401:
            localStorage.removeItem("token");
            return { type: "EXPIRED" };
        default:
            return { type: "EXPIRED" };
    }
};