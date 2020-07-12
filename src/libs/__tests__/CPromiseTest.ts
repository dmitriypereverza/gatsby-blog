import { CPromise } from "../CPromise";

test("test CPromise normal work", function (done) {
  const promise = new CPromise<string>(
    () =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve("OK"), 100);
      }),
  );
  promise.run((data) => {
    console.log("data", data);
    done();
  });
});

test("test CPromise cancel work", function (done) {
  const promise = new CPromise<string>(
    () =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve("OK"), 100);
      }),
  );
  promise.run(
    (data) => {
      console.log("data", data);
    },
    null,
    () => done(),
  );
  promise.cancel();
});
