let nodemailer = require(`nodemailer`)
let mjml = require(`../lib`)
let htmlToText = require(`nodemailer-html-to-text`).htmlToText

// Setup local version of mailcatcher
console.log("Setting up nodemailer")
let transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 1025,
})

console.log("Setting up nodemailer plugins")
// Compile the mjml template to html with parsing the mustache variables
transporter.use(`compile`, mjml({
	viewPath: `${__dirname}/views`
}))

// Convert the html to text to populate the text email part
transporter.use(`compile`, htmlToText())

// Setup test send options
const options = {
  context: {
    name: `Bob Ross`,
    url: `https://mjml.io/try-it-live`,
  },
  from: `from@email.com`,
  to: `to@email.com`,
  subject: `Verify your email address`,
  template: `example`,
}
console.log("Sending options", options)

// Send the email
new Promise((resolve, reject) => {
  transporter.sendMail(options, function(error, info){
      if (error) {
        console.log("Email failed to send")
        return reject(error)
      }
      console.log("Email sent")
      resolve(info)
  })
})
