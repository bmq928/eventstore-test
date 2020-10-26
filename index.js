const faker = require('faker')
const fetch = require('node-fetch')
const uuid = require('uuid')
// const axios = require('axios')
// const username = 'admin'
// const password = 'changeit'

const host = 'http://localhost:2113'
const stream = 'cars'
const projection = 'car-bucketing'
createEvents()
// getEvents()

async function getEvents() {
  const url = `${host}/projection/${projection}/state`
  fetch(url, {
    headers: {
      accept: 'application/json',
    },
    method: 'GET',
  })
    .then((r) => r.json())
    .then((r) => {
      console.log('succ')
      console.log(r)
    })
    .catch((e) => {
      console.log('err')
      console.log(e)
    })
}

async function createEvents(numEvents = 100) {
  const url = `${host}/streams/${stream}`
  const events = [...new Array(numEvents)].map(() => ({
    eventId: uuid.v4(),
    eventType: 'carBought',
    data: {
      owner: faker.name.firstName(),
    },
    metadata: {
      timestamp: Date.now(),
      eventEnd: true
    },
  }))

  fetch(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/vnd.eventstore.events+json',
    },
    body: JSON.stringify(events),
    method: 'POST',
  })
    .then((r) => {
      console.log('succ')
      console.log(r)
    })
    .catch((e) => {
      console.log('err')
      console.log(e)
    })
}

