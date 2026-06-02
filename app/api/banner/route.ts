import fs from 'fs'
import path from 'path'

export async function GET() {
  const bannerDir = path.join(process.cwd(), 'banner')
  try {
    const entries = fs.readdirSync(bannerDir)
    const images = entries
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        src: `/banner/${file}`,
        alt: 'Banner'
      }))
    return Response.json(images)
  } catch {
    return Response.json([])
  }
}