const isAdmin = (user) => {
  const isAdmin =
    user &&
    user["https://yusasaki-casino/roles"] &&
    user["https://yusasaki-casino/roles"].includes("Casino KYC Admin");

  return isAdmin;
};

export {
    isAdmin
}
