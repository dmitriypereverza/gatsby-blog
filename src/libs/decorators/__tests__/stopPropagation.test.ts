import stopPropagation from "../stopPropagation";

test("call stopPropagation", (done) => {
  stopPropagation(() => {
    done();
  })({ stopPropagation: () => {} });
});
