import request from 'supertest'
import app from '../index'

describe('Api Routes', () => {
  it('Checks if homepage is working', async () => {
    const response = await request(app).get('/')

    expect(response.status).toEqual(200)
  })
})
