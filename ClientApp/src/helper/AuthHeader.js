
// gets the JWT of the logged user for request that require Authentication
export const authHeader = () => {
    let ls_item = localStorage.getItem('loggedUser');
    let loggedUser = JSON.parse(ls_item ? ls_item : {});
    if (loggedUser.user && loggedUser.token) {
        return { 'Authorization': `Bearer ${loggedUser.token}` };
    } else {
        return {};
    }
}