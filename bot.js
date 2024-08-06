const axios = require("axios")
const fs = require("fs")
require("dotenv").config()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_USERNAME = process.env.GITHUB_USERNAME

const createContribution = async () => {
  const date = new Date().toISOString().slice(0, 10)
  const content = `Automated contribution for ${date}`
  const path = `contributions/${date}.md`

  const response = await axios({
    method: "put",
    url: `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${path}`,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      message: `Add contribution for ${date}`,
      content: Buffer.from(content).toString("base64"),
    },
  })

  console.log(response.data)
}

createContribution().catch((error) => {
  console.error(error)
})
