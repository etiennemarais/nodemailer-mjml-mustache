# nodemailer-mjml-mustache
[![npm version](https://badge.fury.io/js/nodemailer-mjml-mustache.svg)](https://badge.fury.io/js/nodemailer-mjml-mustache)

A plugin for nodemailer that uses mjml and mustache view engine to generate emails.

## Installation

```sh
npm install nodemailer-mjml-mustache --save
```

### Plugin Options

- `viewPath` **(required)** provides the path to the directory where your views are

### Mail Options

- `template` the name of the template file to use without the extension
- `context` this will be passed to the view engine as the context data to render the variables with.

```js
// example
context: {
  name: `Bob Ross`,
  url: `https://mjml.io/try-it-live`,
}
```

```html
<!-- MJML Example-->
<mj-text>Hello {{name}}, <a href="{{url}}">Click here</a></mj-text>
```

## Example Usage

```js
let nodemailer = require(`nodemailer`)
let mjml = require(`../lib`)
let htmlToText = require(`nodemailer-html-to-text`).htmlToText

// Setup local version of mailcatcher
let transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 1025,
})

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
        return reject(error)
      }
      resolve(info)
  })
})
```
