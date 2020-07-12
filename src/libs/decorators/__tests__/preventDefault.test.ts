import preventDefault from "../preventDefault";

test("call preventDefault", (done) => {
  preventDefault(() => {
    done();
  })({ preventDefault: () => {} });
});
