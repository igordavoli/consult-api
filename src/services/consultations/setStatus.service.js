const { consultationsRepository } = require('../../repositories')

module.exports.setStatus = async (id, status) => {
  const consultation = await consultationsRepository.getById(id);

  const updatedConsultation = consultation.update({ status });

  return updatedConsultation;
}