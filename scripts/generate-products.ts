import fs from 'fs'
import path from 'path'

function scanDirectory(dirPath: string, basePath: string = ''): { src: string; code: string }[] {
  const results: { src: string; code: string }[] = []

  if (!fs.existsSync(dirPath)) {
    return results
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath, `${basePath}/${encodeURIComponent(entry.name)}`))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        const src = `${basePath}/${encodeURIComponent(entry.name)}`
        const code = entry.name.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim()
        results.push({ src, code })
      }
    }
  }

  return results
}

const imagesDir = path.join(process.cwd(), 'public', 'images')

const categories: Record<string, {
  labelEn: string
  labelZh: string
  subcategories?: { key: string; labelEn: string; labelZh: string }[]
  products: { src: string; code: string }[]
}> = {}

const categoryMapping: Record<string, { key: string; labelEn: string; labelZh: string; is规格?: boolean }> = {
  '近期热卖': { key: 'bestsellers', labelEn: 'BEST SELLERS', labelZh: '近期热卖' },
  '弹性大边': { key: 'stretch', labelEn: 'STRETCH LACE', labelZh: '弹性大边' },
  '弹性小边': { key: 'eyelash', labelEn: 'EYELASH LACE', labelZh: '弹性小边' },
  '睫毛蕾丝': { key: 'embroidery', labelEn: 'EMBROIDERY', labelZh: '睫毛蕾丝' },
  '规格': { key: 'trims', labelEn: 'SPECIFICATIONS', labelZh: '规格', is规格: true },
}

for (const [folderName, config] of Object.entries(categoryMapping)) {
  const folderPath = path.join(imagesDir, folderName)

  if (!fs.existsSync(folderPath)) {
    continue
  }

  if (config.is规格) {
    const subcategories: { key: string; labelEn: string; labelZh: string }[] = []
    const subcategoryProducts: Record<string, { src: string; code: string }[]> = {}

    const subEntries = fs.readdirSync(folderPath, { withFileTypes: true })

    for (const subEntry of subEntries) {
      if (subEntry.isDirectory()) {
        const subName = subEntry.name
        subcategories.push({
          key: subName,
          labelEn: subName,
          labelZh: subName,
        })

        const subDirPath = path.join(folderPath, subName)
        subcategoryProducts[subName] = []

        const subFiles = fs.readdirSync(subDirPath)
        for (const file of subFiles) {
          const ext = path.extname(file).toLowerCase()
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            subcategoryProducts[subName].push({
              src: `/images/${encodeURIComponent(folderName)}/${encodeURIComponent(subName)}/${encodeURIComponent(file)}`,
              code: file.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim(),
            })
          }
        }
      }
    }

    categories[config.key] = {
      labelEn: config.labelEn,
      labelZh: config.labelZh,
      subcategories,
      products: Object.values(subcategoryProducts).flat(),
    }
  } else {
    const products: { src: string; code: string }[] = []
    const files = fs.readdirSync(folderPath)

    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        products.push({
          src: `/images/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`,
          code: file.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim(),
        })
      }
    }

    categories[config.key] = {
      labelEn: config.labelEn,
      labelZh: config.labelZh,
      products,
    }
  }
}

const outputPath = path.join(process.cwd(), 'public', 'data', 'products.json')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2))
console.log('Generated products.json with', Object.keys(categories).length, 'categories')