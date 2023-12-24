export function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/email-already-in-use":
      return "Provided email is already used";

    // Many more authCode mapping here...

    default:
      return "";
  }
}
