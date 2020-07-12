import { StackPagination } from "../StackPagination";

test("test RecursiveExplorer", function () {
  const sp = new StackPagination();
  sp.push([
    { id: 1, name: "sdsd" },
    { id: 2, name: "sdsd" },
    { id: 3, name: "sdsd" },
    { id: 4, name: "sdsd" },
  ]);
  sp.push([{ id: 10, name: "102" }]);
  sp.push([{ id: 100, name: "1002" }]);

  expect(sp.current()).toStrictEqual([{ id: 100, name: "1002" }]);
});

test("test StackPagination onChange", function (done) {
  const sp = new StackPagination();
  sp.push([
    { id: 1, name: "sdsd" },
    { id: 2, name: "sdsd" },
    { id: 3, name: "sdsd" },
    { id: 4, name: "sdsd" },
  ]);
  sp.push([{ id: 10, name: "102" }]);

  sp.onChangeCurrent = (current) => {
    expect(current).toStrictEqual([{ id: 100, name: "1002" }]);
    done();
  };

  sp.push([{ id: 100, name: "1002" }]);
});
