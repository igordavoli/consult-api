const professionalView = require('./professional.view');

module.exports = (professional) => {
  return professionals.map((professional) => professionalView(professional));
}