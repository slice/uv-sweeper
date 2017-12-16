const snek = require('snekfetch')
const cheerio = require('cheerio')

const UV = {
  host: 'feedback.discordapp.com',
  forum: '326712-discord-dream-land',
}

const fakeHeaders = {
  Pragma: 'no-cache',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 ' +
    'Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json, text/javascript, */*; q=0.01',
  'Cache-Control': 'no-cache',
  Authority: UV.host,
  'X-Requested-With': 'XMLHttpRequest',
}

function inflate(html) {
  const $ = cheerio.load(html)

  return $('.uvListItem')
    .map(function mapper() {
      const el = $(this)
      return {
        id: el.find('.uvIdeaVoteCount').attr('data-id'),
        url: `https://${UV.host}${el.find('.uvIdeaTitle a').attr('href')}`,
        title: el.find('.uvIdeaTitle a').text(),
        status: el.find('.uvStyle-status').text() || 'none',
        description: el
          .find('.uvIdeaDescription')
          .text()
          .trim(),
        votes: parseInt(
          el
            .find('.uvIdeaVoteCount strong')
            .text()
            .replace(/,/g, '') // remove commas
        ),
      }
    })
    .get()
}

exports.search = search
async function search(query, { page, consumerKey, timezone, session, uid }) {
  // compose headers to use
  const headers = {
    ...fakeHeaders,
    Cookie:
      `_testcookie; _rf=1; _uservoice_tz=${timezone}; ` +
      `_uvsid=${session}; _uservoice_uid=${uid}; __uvt=`,
  }

  // make the request
  const req = snek
    .get(`https://${UV.host}/forums/${UV.forum}/search`, { headers })
    .query('query', query)
    .query('oauth_consumer_key', consumerKey)
    .query('oauth_signature_method', 'HMAC-SHA1')

  if (page) req.query('page', page)

  const resp = await req

  if (!resp.ok) {
    console.error('failed to fetch -- uv is dumb')
    console.error(resp)
    return { error: 'failed to contact uv', status: resp.status }
  }

  if (resp.text.includes('<html>')) {
    // just in case
    console.info('eww, got html response')
    const listing = cheerio
      .load(resp.text)
      .find('.uvForumSearchResults-container')
    return inflate(listing.html())
  } else if (resp.text.includes('uvListItem-noresults')) {
    // nothing
    return []
  } else {
    // good ol' json response
    return inflate(resp.body.html)
  }
}
