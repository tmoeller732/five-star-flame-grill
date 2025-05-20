
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

// Read the template HTML file
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Define routes to pre-render
const routesToPrerender = [
  '/',
  '/about',
  '/menu',
  '/order',
  '/blog',
  '/contact'
]

;(async () => {
  // For each route, render the HTML and write to a file
  for (const url of routesToPrerender) {
    const appHtml = await render(url)
    
    // Make sure we're replacing the placeholder correctly
    const html = template.replace(`<!--app-html-->`, appHtml)

    // Create the file path
    const filePath = `dist${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
