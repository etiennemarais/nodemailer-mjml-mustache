let fs = require(`fs`)
let path = require(`path`)
let mjml = require(`mjml`)
let Mustache = require(`mustache`)

var TemplateGenerator = function(opts) {
  this.viewPath = opts.viewPath
};

TemplateGenerator.prototype.render = function render(mail, cb) {
  if (mail.data.html) return cb()

  var templatePath = path.resolve(path.join(this.viewPath, mail.data.template + ".mjml"))

  // Get the template contents to render the mustache variables
  fs.readFile(templatePath, 'utf8', (err, templateContent) => {
    if (err) throw err
    // Render the mjml template content
    var renderedMjmlTemplate = Mustache.render(templateContent, mail.data.context)
    // Render the mjml template with variables into normal html
    let result = mjml(renderedMjmlTemplate)
    mail.data.html = result.html
    cb()
  })
}

module.exports = TemplateGenerator
