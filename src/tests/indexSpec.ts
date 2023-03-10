import supertest from 'supertest'
import app from '../index'
import fs from 'fs'
import path from 'path'

const request = supertest(app)

const outDataPath = path.resolve('./data/out')

describe('API Routes', () => {
  beforeAll(() => {
    if (!fs.existsSync(outDataPath)) {
      fs.mkdirSync(outDataPath)
    }
  })
  describe('GET /', () => {
    it('Checks if homepage is working', async () => {
      const response = await request.get('/')
      expect(response.status).toEqual(200)
    })
  })
  describe('GET /convert endpoints', () => {
    it('Main convert page should return 400', async () => {
      const response = await request.get('/convert')
      expect(response.status).toBe(400)
    })
    it('Convert without width should return 400', async () => {
      const response = await request.get('/convert?imgName=sample.jpg&height=500')
      expect(response.status).toBe(400)
    })
    it('Convert without imgName should return 400', async () => {
      const response = await request.get('/convert?height=500&width=500')
      expect(response.status).toBe(400)
    })
    it('Convert without height should return 400', async () => {
      const response = await request.get('/convert?imgName=sample&width=500')
      expect(response.status).toBe(400)
    })
    it('Convert with height=a should return 400', async () => {
      const response = await request.get('/convert?imgName=sample&height=a')
      expect(response.status).toBe(400)
    })
    it('Convert with width=-100 should return 400', async () => {
      const response = await request.get('/convert?imgName=sample&width=-100')
      expect(response.status).toBe(400)
    })
    it('Convert with all correct parameters return 200', async () => {
      const response = await request.get('/convert?imgName=sample&width=500&height=500')
      expect(response.status).toBe(200)
    })
    it('Convert with width and height', async () => {
      const response = await request.get('/convert?imgName=sample&width=500&height=500')
      expect(response.status).toBe(200)
      expect(response.type).toMatch('image/jpeg')
    })
    it('Convert with size only', async () => {
      const response = await request.get('/convert?imgName=sample&size=500')
      expect(response.status).toBe(200)
      expect(response.type).toMatch('image/jpeg')
    })
    it('Convert with size and height/width should return error 400', async () => {
      const response = await request.get('/convert?imgName=sample&width=500&height=500&size=600')
      expect(response.status).toBe(400)
    })
  })
})
