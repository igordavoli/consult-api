const request = require('supertest');
const app = require('../../app');

describe('User', () => {

  it('Should BE able to create a new user',
    async () => {
      const res = await request(app).post('/api/v1/auth/signup')
        .send({
          email: 'user@exemple.com',
          firstName: 'user',
          lastName: 'doo',
          telephone: '11123456789',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('storedUser');
    });

  it('Should NOT able to create a new user when is missing a field.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signup')
        .send({
          email: 'user1@exemple.com',
          // firstName: 'user',
          lastName: 'doo',
          telephone: '11123456789',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(422);
    });

  it('Should NOT be able to create a new user when already exists a user with the same EMAIL.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signup')
        .send({
          email: 'user@exemple.com',
          firstName: 'user',
          lastName: 'doo',
          telephone: '11123456789',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(409);
      expect(res.body).toMatch('email-already-registered');
    });

  it('Should BE able to create a new user when already exists a user with the same first and last name.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signup')
        .send({
          email: 'user2@exemple.com',
          firstName: 'user',
          lastName: 'doo',
          telephone: '11123456789',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('storedUser');
    });


  // /*
  //  *|> SINGIN IN
  //  */

  it('Should BE able to login a user when inputted a existent email and a corespondent password.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signin')
        .send({
          email: 'user@exemple.com',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

  it('Should be able to NOT permit a login when inputted a inexistent email.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signin')
        .send({
          email: 'user@fail-exemple.com',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'user-not-found');
      expect(res.body).toHaveProperty('name', 'LoginError');
      expect(res.body).toHaveProperty('errors', ['email-not-exists']);
    });

  it('Should be able to NOT permit a login when missing email field.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signin')
        .send({
          // email: 'user@fail-exemple.com',
          password: 'user123Exemple',
        });

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty('name', 'ValidationError');
      expect(res.body).toHaveProperty('message', 'email is a required field');
      expect(res.body).toHaveProperty('errors', ["email is a required field"]);
    });

  it('Should be able to NOT permit a login when inputted a incorrect password.',
    async () => {
      const res = await request(app).post('/api/v1/auth/signin')
        .send({
          email: 'user@exemple.com',
          password: 'userExemple123',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('name', 'AuthorizationError');
      expect(res.body).toHaveProperty('message', 'invalid-password');
      expect(res.body).toHaveProperty('errors', ['wrong-password']);
    });
});
