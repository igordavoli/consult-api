const { usersRepository, professionalsRepository, consultationsRepository } = require("../../repositories");
const { messages } = require("../../helpers");
const { StatusCodes } = require("http-status-codes");

module.exports.createConsultation = async (consultationData, userId) => {
  const user = await usersRepository.getById(userId);

  console.log(consultationData)

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
      message: messages.notFound('professional'),
    };
  }

  const _consultationData = {
    user_id: userId,
    status: 'created',
    professional_id: consultationData.professionalId,
    reason: consultationData.reason,
  }

  const consultation = await consultationsRepository.create(_consultationData);

  await user.addConsultation(consultation);
  await professional.addConsultation(consultation);

  return consultation;
}