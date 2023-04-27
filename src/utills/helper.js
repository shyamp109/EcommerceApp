export const ValidatePath = (path) => {
  if (path === "/" || path === "/Home") {
    return true;
  } else {
    return false;
  }
};
