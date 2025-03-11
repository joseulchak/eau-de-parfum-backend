//let accessToken = "";

import { usersRepository } from "../../api/repositories/users.repository";

beforeAll(deleteTestUsers);
afterAll(deleteTestUsers);

test("POST api/v1/user should return 200", async () => {
  const accessToken = await getAccessToken();
  const userResponse = await fetch("http://localhost:3000/api/v1/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({
      email: "its.an.important.email@gmail.com",
      name: "test",
      password: "123456",
    }),
  });
  const userData = await userResponse.json();

  expect(userResponse.status).toBe(200);
  expect(userData.password).toBe(undefined);
});

test("POST api/v1/user should return 400", async () => {
  const accessToken = await getAccessToken();
  const userResponse = await fetch("http://localhost:3000/api/v1/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({
      email: "its.an.important.email@gmail.com",
      name: "test",
      password: "123456",
    }),
  });

  expect(userResponse.status).toBe(400);
});

async function getAccessToken() {
  const authResponse = await fetch("http://localhost:3000/api/v1/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "geicy@geicymeira.com.br",
      pwd: "123456",
    }),
  });
  const data = await authResponse.json();
  return data.accessToken;
}

async function deleteTestUsers() {
  await usersRepository.deleteTestUsers();
}
