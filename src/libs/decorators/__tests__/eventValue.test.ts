import eventValue from "../eventValue";

test("Return 'value' on event like object", () => {
  const target = { value: "hello" } as HTMLInputElement;
  // @ts-ignore
  const event = { target } as Event;
  let resultValue = "";

  eventValue(function (value: string) {
    resultValue = value;
  })(event);

  expect(resultValue).toBe("hello");
});

test("Return 'null' on undefined", () => {
  let resultValue = "123";

  eventValue(function (value) {
    resultValue = value;
  })();

  expect(resultValue).toBe(null);
});
