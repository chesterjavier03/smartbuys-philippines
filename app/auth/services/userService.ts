export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if(username !== "admin" && password !== "admin") {
    return null;
  }

  const user = { 
    id: "testing",
    name: "Web Admin", 
    email: "admin@example.com"};

  return user;
}