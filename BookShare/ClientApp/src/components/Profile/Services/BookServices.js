export const fetchDelete = async (id, username) => {
    const options = { method: "DELETE" };
    const result = await fetch(`/api/user/id=${id}&username=${username}`, options);
    const json = await result.json();

    console.log(json);

    return {
        notify: { success: true, message: "Book has been deleted" },
        user: json.user
    };
};

export const initModal = {
    open: false,
    id: ""
};

export const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};
