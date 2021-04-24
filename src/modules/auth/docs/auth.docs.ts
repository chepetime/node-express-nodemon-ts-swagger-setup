import { textPlain } from "ts-openapi";

export class AuthDocs {
  generateJWT = {
    summary: "Generate JWT",
    description:
      "This Middleware verify if we have the user at our database here and returns a response with the generated JWT",
    operationId: "generate-auth-jwt",
    responses: {
      200: textPlain("Successful Operation"),
      400: textPlain("Bad Request"),
    },
    tags: ["auth"],
  };

  refreshJWT = {
    summary: "Refresh JWT",
    description:
      "Validate JWT and create a new one based on the generated refresh token ",
    operationId: "refresh-auth-jwt",
    responses: {
      200: textPlain("Successful Operation"),
      400: textPlain("Bad Request"),
    },
    tags: ["auth"],
  };
}
