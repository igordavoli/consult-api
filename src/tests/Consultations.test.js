const request = require('supertest');
const app = require('../../app');

describe('Consultations', () => {
  const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmMDA2Mzc3LWE0OWMtNDQzNC1iYmRlLWFkNzg0OGFkNDNkZCIsImVtYWlsIjoiYWRtaW5AaW9hc3lzLmNvbSIsImlzUHJvZmVzc2lvbmFsIjpmYWxzZSwiaWF0IjoxNjIxNTE5OTAwfQ.Gj1pDCh-bhTuKlYySwG-t00DUqtvOxYg1epOXPAyGSE';

  const proToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyNDA5ZDk3LTZlNTQtNDg4MS1hNWU1LTUwMjFmOTdhYzIxZSIsImVtYWlsIjoiam9obmxlZUBwc3ljaG9sb2dpc3QuY29tIiwiaXNQcm9mZXNzaW9uYWwiOnRydWUsImlhdCI6MTYyMjYwMTk3MX0.GQuHlrygOZ6feVHgg8mEzMmb79mV7vk9rtLPQOvJSj8'

  const consultationId = 'aade9ce5-a525-46c8-bb59-983f7e7672d9'
  const professionalId = '82409d97-6e54-4881-a5e5-5021f97ac21e'
  const userId = '4f006377-a49c-4434-bbde-ad7848ad43dd'

  it('USER should BE able to create a new consultation',
    async () => {
      const res = await request(app).post(`/api/v1/users/${userId}/consultations`)
        .send({
          professionalId: "82409d97-6e54-4881-a5e5-5021f97ac21e",
          reason: "Problems"
        })
        .set({ Authorization: userToken });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('storedConsultation');
    });

  it('PROFESSIONAL should BE able to confirm a new consultation',
    async () => {
      const res = await request(app).post(`/api/v1/professionals/${professionalId}/consultations/${consultationId}/confirmation`)
        .set({ Authorization: proToken });

      expect(res.status).toBe(204);
    });
})