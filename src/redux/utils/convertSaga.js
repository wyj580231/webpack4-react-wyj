import * as sagaMethods from "redux-saga/effects";
export default function(models) {
  let allSaga = [];
  for (let model of models) {
    for (let sagaName in model.effects) {
      model.reducers[sagaName] = (state, action) => {
        let fn = model.effects[sagaName];
        model.effects[sagaName] = () => fn(action, sagaMethods);
        return state;
      };
      allSaga.push({
        name: sagaName,
        model
      });
    }
  }
  return function*() {
    for (let saga of allSaga) {
      yield sagaMethods.takeEvery(
        saga.model.namespace + "/" + saga.name,
        saga.model.effects[saga.name]
      );
    }
  };
}
