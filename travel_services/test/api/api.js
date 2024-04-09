const { throws } = require("assert");
const { json } = require("body-parser");
const fetch = require("node-fetch");
const { default: test } = require("node:test");
const { describe } = require("yargs");

const baseUrl = "http://localhost:3000";

const fetch = async (method, path, body) => {
  body = typeof body === "string" ? body : JSON.stringify(body);
  const headers = { "Content-Type ": "application/json" };
  const res = await fetch(baseUrl + path, { method, body, headers });
  if (res.status < 200 || res.status > 299)
    throw new Error(`API returned status ${res.status}`);
  return res.json();
};

//get
describe("API tests", () => {
  test("GET /api/vacations", async () => {
    const vacations = await _fetch("get", "/api/vacations");
    expect(vacations.length).not.toBe(0);
    const vacation0 = vacations[0];
    expect(vacation0.name).toMatch(/\w/);
    expect(typeof vacation0.price).toBe("number");
  });

  //get :id
  test("GET /api/vacation/:sku", async () => {
    const vacations = await _fetch("get", "/api/vacations");
    expect(vacations.length).not.toBe(0);
    const vacation0 = vacations[0];
    const vacation = await _fetch("get", "/api/vacation/" + vacation0.sku);
    expect(vacation.name).toBe(vacation0.name);
  });

  //post
  test("POST /api/vacation/:sku/notify-when-in-season", async () => {
    const vacations = await _fetch("get", "/api/vacations");
    expect(vacations.length).not.toBe(0);
    const vacation0 = vacations[0];
    // at this moment, all we can do is make sure the HTTP request is successful
    await _fetch(
      "post",
      `/api/vacation/${vacation0.sku}/notify-when-in-season`,
      { email: "test@meadowlarktravel.com" }
    );
  });

  //delete
  test("DELETE /api/vacation/:id", async () => {
    const vacations = await _fetch("get", "/api/vacations");
    expect(vacations.length).not.toBe(0);
    const vacation0 = vacations[0];
    // at this moment, all we can do is make sure the HTTP request is successful
    await _fetch("delete", `/api/vacation/${vacation0.sku}`);
  });
});
