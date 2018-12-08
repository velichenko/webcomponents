export const client = (url, method = 'GET', params = {}) => fetch(`/api/${url}`, {
    method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    ...params
})
    .then(res => res.status !== 200 ? new Error() : res)
    .then(res => res.json())
    .catch(() => console.log('failure'));
