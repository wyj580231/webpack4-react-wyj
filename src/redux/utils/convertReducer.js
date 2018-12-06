export default function(models) {
  let result = {};
  for (let model of models) {
    for (let reducerName in model.reducers) {
      model.reducers[`${model.namespace}/${reducerName}`] =
        model.reducers[reducerName];
      delete model.reducers[reducerName];
    }
    result[model.namespace] = (state = model.state, action) => {
      return action.type in model.reducers
        ? model.reducers[action.type](state, action)
        : state;
    };
  }
  return result;
}
