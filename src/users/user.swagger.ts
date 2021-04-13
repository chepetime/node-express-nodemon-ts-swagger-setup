import { textPlain, Types, bodySchema } from "ts-openapi";

const responseSchema = {
  id: Types.Uuid({ description: "Customer ID" }),
  name: Types.String({
    description: "Customer name",
    maxLength: 100,
    required: true,
  }),
  type: Types.StringEnum({
    values: ["A", "B"],
    description: "Customer Type",
  }),
  birthdate: Types.Date({ description: "Birthdate" }),
};

export class UsersSwagger {
  listUsers = {
    summary: "Get all users",
    description: "This operation retrieves all users",
    operationId: "get-users-op",
    responses: {
      200: textPlain("Successful Operation"),
      400: textPlain("Bad Request"),
    },
    tags: ["users"],
  };

  getUserById = {
    summary: "Get a user data",
    description: "This operation retrieves a single user information",
    operationId: "get-user-op",
    requestSchema: {
      params: {
        userId: Types.Uuid({
          description: "Customer ID",
          required: true, // param values MUST be required
          example: "37237d6a-bb7e-459a-b75d-d1733210ad5c",
        }),
      },
    },
    responses: {
      200: bodySchema(
        Types.Object({
          description: "Successful Operation",
          properties: responseSchema,
        })
      ),
      400: textPlain("Bad Request"),
    },
    tags: ["users"],
  };

  createUser = {
    summary: "Create a user",
    description: "Create Users",
    operationId: "create-user-op",
    responses: {
      200: textPlain("Successful Operation"),
      400: textPlain("Bad Request"),
    },
    tags: ["users"],
  };

  patch = {};

  put = {};

  removeUser = {};
}
