const request = require('supertest');
const app = require('../../app');

describe('Professional', () => {

  it('Should BE able to create a new professional',
    async () => {
      const res = await request(app).post('/api/v1/auth/signuppro')
        .send({
          firstName: 'john',
          lastName: 'Cardio',
          email: 'jhon@cardiologist.com',
          professionalField: 'Cardiologist',
          password: '12341234',
          city: 'são paulo',
          crp: '0987654321',
          remotely: false,
          experience: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
          biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('storedProfessional');
    });
  it('Should NOT able to create a new user when is missing a field.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signuppro')
        .send({
          firstName: 'john',
          lastName: 'Cardio',
          email: 'jhon1@cardiologist.com',
          professionalField: 'Cardiologist',
          password: '12341234',
          city: 'são paulo',
          // crp: '0987654321',
          remotely: false,
          experience: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
          biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!'
        });

      expect(res.status).toBe(422);
    });

  it('Should NOT be able to create a new user when already exists a user with the same EMAIL.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signuppro')
        .send({
          firstName: 'john',
          lastName: 'Cardio',
          email: 'jhon@cardiologist.com',
          professionalField: 'Cardiologist',
          password: '12341234',
          city: 'são paulo',
          crp: '0987654321',
          remotely: false,
          experience: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
          biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!'
        });

      expect(res.status).toBe(409);
      expect(res.body).toMatch('email-already-registered');
    });

  it('Should BE able to create a new user when already exists a user with the same first and last name.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signuppro')
        .send({
          firstName: 'john',
          lastName: 'Psycho',
          email: 'jhon@pschologist.com',
          professionalField: 'Cardiologist',
          password: '12341234',
          city: 'são paulo',
          crp: '0987654321',
          remotely: false,
          experience: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
          biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('storedProfessional');
    });


  // /*
  //  *|> SINGIN IN
  //  */

  it('Should BE able to login a user when inputted a existent email and a corespondent password.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signinpro')
        .send({
          email: 'jhon@cardiologist.com',
          password: '12341234',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('professional');
    });

  it('Should be able to NOT permit a login when inputted a inexistent email.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signinpro')
        .send({
          email: 'inexistent@email.com',
          password: '12341234',
        });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'user-not-found');
      expect(res.body).toHaveProperty('name', 'LoginError');
      expect(res.body).toHaveProperty('errors', ['email-not-exists']);
    });
  it('Should be able to NOT permit a login when missing email field.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signinpro')
        .send({
          // email: 'inexistent@email.com',
          password: '12341234',
        });

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty('name', 'ValidationError');
      expect(res.body).toHaveProperty('message', 'email is a required field');
      expect(res.body).toHaveProperty('errors', ["email is a required field"]);
    });

  it('Should be able to NOT permit a login when inputted a incorrect password.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signinpro')
        .send({
          email: 'jhon@pschologist.com',
          password: 'wrongPassword',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('name', 'AuthorizationError');
      expect(res.body).toHaveProperty('message', 'invalid-password');
      expect(res.body).toHaveProperty('errors', ['wrong-password']);
    });
});
