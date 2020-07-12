import { getStickyPromisesBuilder } from "libs/joinablePromises";

test("test joinablePromisesBuilder", function (done) {
  const join = getStickyPromisesBuilder();

  Promise.all([
    join((resolve) => {
      setTimeout(() => resolve("OK"), 1000);
    }, "key1"),
    join((resolve) => {
      setTimeout(() => resolve("OK2"), 1000);
    }, "key1"),
  ]).then(([response1, response2]) => {
    expect(response1).toBe(response2);
    done();
  }, done);
});

test("test joinablePromisesBuilder with error passing", function (done) {
  const stickyPromisesBuilder = getStickyPromisesBuilder();

  Promise.all([
    stickyPromisesBuilder((_, reject) => {
      setTimeout(() => reject("ERR"), 1000);
    }, "key1"),
    stickyPromisesBuilder((_, reject) => {
      setTimeout(() => reject("ERR2"), 1000);
    }, "key1"),
  ]).then(([response1, response2]) => {
    expect(response1).toBe(response2);
    done();
  }, done);
});
