import { assertEquals, assertExists } from "../deps.ts";
import { ipgeolocation } from "./mod.ts";

Deno.test("ip geolocation", async (t) => {
  const { api } = ipgeolocation({
    apiKey: Deno.env.get("IPGEOLOCATION_API_KEY"),
  });

  await t.step("get geolocation", async () => {
    const data = await api.ipgeo.get<Geolocation>("192.168.123.132");
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
