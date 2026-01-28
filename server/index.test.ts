import { describe, expect, it } from "vitest";

// types
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BASE_URL = process.env.BASE_URL;

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface RequestResult<T = unknown> {
  status: number;
  data: ApiResponse<T>;
}

interface SignupResponse {
  _id: string;
  username: string;
  email: string;
  role: "student" | "teacher";
}

/* ======================================================
   Helpers
====================================================== */

async function request<T = unknown>(
  method: HttpMethod,
  path: string,
  body: Record<string, unknown> | null = null,
  token: string | null = null,
): Promise<RequestResult<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = token;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = (await response.json()) as ApiResponse<T>;

  console.log("FETCH URL:", `${BASE_URL}${path}`);

  return {
    status: response.status,
    data,
  };
}

function generateWord(prefix = "test") {
  return `${prefix}_${Date.now()}`;
}

/* ======================================================
   AUTH TESTS - POST /auth/signup
====================================================== */

describe("POST /auth/signup", () => {
  it("This test should create a new student user with correct response format", async () => {
    const email = `${generateWord("saifalikhan")}@test.com`;

    const { status, data } = await request<SignupResponse>(
      "POST",
      "/auth/signup",
      {
        username: "John Doe",
        email,
        password: "password123",
        role: "student",
      },
    );

    expect(status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data?._id).toBeDefined();
    expect(data.data?.username).toBe("John Doe");
    expect(data.data?.email).toBe(email);
    expect(data.data?.role).toBe("student");
    expect((data.data as any)?.password).toBeUndefined();
  });
});
