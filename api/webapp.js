const path = require('path')
const fs = require('fs')
const p2r = require('path-to-regexp')

const Domain = require('../src/domain').default
const domain = new Domain()

const indexHTML = fs.readFileSync(path.join(__dirname, '../public/index.html'))

module.exports = async (req, res) => {
  const match = p2r.match('/:org?/:repo?/:folder?/:file?')
  const {params} = match(req.url)
  const {org, repo, folder, file} = params || {}

  if (file) {
  }

  if (folder) {
  }

  if (repo) {
  }

  if (org) {
    const organization = await domain
      .get('get_info_organization_use_case')
      .execute({name: params.org})
    console.log({organization})
  }

  res.send(indexHTML)
}
