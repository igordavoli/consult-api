const { usersRepository, professionalsRepository, consultationsRepository } = require("../../repositories");
const { messages } = require("../../helpers");
const { StatusCodes } = require("http-status-codes");

module.exports.create = async (consultationData) => {
  const user = await usersRepository.getById(consultationData.userId);

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  const professional = await professionalsRepository.getById(
    consultationData.professionalId
  );

  if (!professional) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  consultation.status = 'waitingProfessionalConfirmation'

  const consultation = await consultationsRepository.create(consultationData);

  await user.addConsultation(consultation);

  return consultation;
}