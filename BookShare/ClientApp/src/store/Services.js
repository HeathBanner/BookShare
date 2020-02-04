export const fetchProfile = (id) => {
    fetch(`/api/user/id=${id}`)
        .then(res => res.json())
        .then((json) => {
            console.log(json);
            if (json.statusCode === 500) return { user: null };
            return { user: json };
        })
        .catch(() => { return { user: null }; });

};
