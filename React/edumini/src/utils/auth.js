// src/utils/auth.js

export const saveUser = (user) => {
  console.log("Saving user to localStorage:", user); // Debugging log
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null;
}

export const logoutUser = () => {
  localStorage.removeItem("user")
  
}

export const initializeDefaultUser = () => {
  const defaultUser = { email: "test@example.com", password: "password123" };
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(defaultUser));
  }
};

