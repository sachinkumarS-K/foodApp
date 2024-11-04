export default function validate(name, email, password, type) {
  console.log([...arguments]);

  const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    email
  );


  if (type === "signin") {
    const isPasswordValid = password.length > 0; // Basic check for password non-empty
      const isNameValid = /^[a-zA-Z ]+$/.test(name);
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";

    return null;
  } else if (type === "signup") {
      const isNameValid = /^[a-zA-Z ]+$/.test(name);
    const isPasswordValid = password.length >= 6;

    if (!isNameValid) return "Name is not valid";
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password must be at least 6 characters long";
    return null;
  }

}
