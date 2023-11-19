const dotenv = require('dotenv')
const { Router } = require('express')
const { OpenAI } = require('openai')

dotenv.config()

const router = Router()

const config = {
  apiKey: process.env.OPENAI_KEY
}

const openAI = new OpenAI(config)

router.route('/').get((req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E'
  })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await openAI.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = response.data[0].b64_json
    res.status(200).json({
      message: 'success',
      photo: image
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Something went wrong'
    })
  }
})

module.exports = router;
