const professionalView = require('./professional.view');

module.exports = (professionals) => {
  return professionals.map((professional) => professionalView(professional));
}