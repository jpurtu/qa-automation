package example;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

public class JsonPlaceholderSimulation extends Simulation {

  private static final HttpProtocolBuilder httpProtocol = http
      .baseUrl("https://jsonplaceholder.typicode.com")
      .acceptHeader("application/json");

  private static final ScenarioBuilder scenario = scenario("JSONPlaceholder Load Test")
      .exec(http("GET usuarios").get("/users")
          .check(status().is(200)))
      .pause(1)
      .exec(http("GET usuario por ID").get("/users/1")
          .check(status().is(200)))
      .pause(1)
      .exec(http("POST crear usuario").post("/users")
          .body(StringBody("{\"name\":\"JP\",\"job\":\"QA Engineer\"}"))
          .header("Content-Type", "application/json")
          .check(status().is(201)));

  {
    setUp(
      scenario.injectOpen(
        rampUsers(10).during(30)
      )
    ).assertions(
      global().failedRequests().count().lt(1L),
      global().responseTime().percentile(95).lt(500)
    ).protocols(httpProtocol);
  }
}
