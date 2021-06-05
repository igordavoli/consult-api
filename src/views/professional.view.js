module.exports = (professional) => {

  const photoURL = professional.photoName !== null
    ? `${process.env.API_DOMAIN}:${process.env.PORT}${process.env.API_ROUTE}/uploads/${professional.photoName}`
    : null

  return {
    id: professional.id,
    email: professional.email,
    firstName: professional.firstName,
    lastName: professional.lastName,
    city: professional.city,
    remotely: professional.remotely,
    photoName: professional.photoName,
    photoURL,
  }
}