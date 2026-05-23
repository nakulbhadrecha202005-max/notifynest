const Authproduct = require('../Middlewares/Authproduct')
const Router = require('express').Router()

Router.get('/', Authproduct, (req, res) => {
  // console.log('----login users details----', req.user)
  res.status(200).json([
    {
      name: 'mobile',
      price: 9998453537
    },
    {
      name: 'laptop',
      price: 9998453537
    },
    {
      name: 'mobile3',
      price: 9998453537
    },
    {
      name: 'mobile4',
      price: 9998453537
    }
  ])
})

module.exports = Router
