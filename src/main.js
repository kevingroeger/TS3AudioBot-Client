const yts = require('yt-search')

async function test (val) {
  const results = await yts({ query: val, category: 'music' })
  console.log(results)
}

test()
