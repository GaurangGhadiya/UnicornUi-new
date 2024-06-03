export function authHeader() {
  // return authorization header with basic auth credentials
  const userId: any = localStorage.getItem('id');
  const id = JSON.parse(userId);

  if (id) {
    return { Authorization: 'Basic ' + id };
  } else {
    return {};
  }
}
