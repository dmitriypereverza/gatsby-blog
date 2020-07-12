import { smartDeepMergeRight } from "libs/smartDeepMergeRight";

test("test smartDeepMerge. Equals check", function () {
  const deepMerge = smartDeepMergeRight(100);

  const first = {
    a: {
      b: {
        s: {
          d: [3],
          c: 6,
        },
      },
      s2: 4,
    },
    b2: 5,
  };
  expect(deepMerge(first, first)).toStrictEqual(first);
});

test("test smartDeepMerge. Not equal check", function () {
  const deepMerge = smartDeepMergeRight(100);
  const first = {
    a: {
      b: {
        s: {
          d: [3, 4, 4],
          c: 6,
        },
      },
      s2: 4,
    },
    b2: 5,
  };
  const second = {
    a: {
      b: {
        s: {
          d: 3,
          c: 7,
        },
      },
      s2: 0,
    },
    b2: 1,
  };
  expect(deepMerge(first, second)).toStrictEqual(second);
});

test("test smartDeepMerge. Deep threshold check", function () {
  const deepMerge = smartDeepMergeRight(1);

  const first = {
    a: {
      b: {
        s: {
          d: 3,
          c: 7,
          a: "otherValue",
          aa: [1, 5, 6],
        },
      },
      s2: 4,
    },
    b2: 5,
  };
  const second = {
    a: {
      b: {
        s: {
          d: 3,
          c: 7,
        },
      },
      s2: 4,
    },
    b2: 5,
  };
  expect(deepMerge(first, second)).toStrictEqual(second);
});

test("test smartDeepMerge. With function", function () {
  const deepMerge = smartDeepMergeRight(1);

  const first = {
    a: {
      b: {
        s: {
          d: 3,
          c: 7,
          a: "otherValue",
          aa: [1, 5, 6],
        },
      },
      s2: 4,
    },
    b2: function () {
      return 5;
    },
  };
  const second = {
    a: {
      b: 1,
      s2: 4,
    },
    b2: function () {
      return 1;
    },
  };
  expect(deepMerge(first, second)).toStrictEqual(second);
});
