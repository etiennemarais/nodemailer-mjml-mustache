let TemplateGenerator = require('./mjml-template-render')

module.exports = function(options) {
  var generator = new TemplateGenerator(options)

  return function(mail, cb) {
      generator.render(mail, cb)
  };
};
