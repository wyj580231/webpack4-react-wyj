import * as sagaMethods from "redux-saga/effects";
export default function(models) {
  let allSaga = [];
  for (let model of models) {
    for (let sagaName in model.effects) {
      if (model.effects.hasOwnProperty(sagaName)) {
        allSaga.push({
          name: sagaName,
          model
        });
      }
    }
  }
  function* rootSaga() {
    for (let saga of allSaga) {
      yield sagaMethods.takeEvery(
        saga.model.namespace + "/" + saga.name,
        function*(action) {
          const dispatchPromiseResolve =
            action[Symbol.for("dispatchPromiseResolve")];
          const res = yield sagaMethods.call(
            saga.model.effects[saga.name],
            sagaMethods,
            action
          );
          yield dispatchPromiseResolve(res);
        }
      );
    }
  }
  return { rootSaga, allSaga };
}
