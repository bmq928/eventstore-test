fromAll().when({
  $init: function () {
    return {
      curCount: 0,
      buckets: [],
      times: [],
      logs: [],
    }
  },
  carBought: function (state, event) {
    const bucketTimeSize = 5000 //5s
    const metadata = JSON.parse(event.metadataRaw)
    const time = metadata.timestamp
    const shouldCreateNewBucket =
      !state.times.length ||
      time - state.times[state.times.length - 1] >= bucketTimeSize

    state.curCount++

    if (shouldCreateNewBucket) {
      state.times.push(time)
      state.buckets.push(state.curCount)
    } else {
      state.buckets[state.buckets.length - 1] = state.curCount
    }

    emit('finished', 'carBoughtFinished', state, metadata)
  },
})
