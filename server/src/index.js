const express = require('express')
const app = express()

const { search } = require('./uvportal')
const keys = require('../keys.json')

app.get('/uv-portal/search', async (req, res) => {
  if (!req.query.q) {
    res.status(400).json({ error: 'no query' })
    return
  }

  console.log(`conducting query: ${req.query.q}`)
  const resp = await search(req.query.q, {
    ...keys,
    page: req.query.page,
  })
  res.json(resp)
})

const PORT = process.env.PORT || 9986
app.listen(PORT, () => {
  console.log(`listening on :${PORT}`)
})
