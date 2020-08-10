const puppeteer = require('puppeteer')

const sneakerdb = {count: 0}

let sneakerScraper = async () => {
  let sneakersUrl = "https://www.kixify.com/";

  let browser = await puppeteer.launch({headless: false})
  let page = await browser.newPage();

  await page.goto(sneakersUrl, {waitUntil: 'networkidle2'})

  let data = await page.evaluate(()  => {
    try {
    let images = document.querySelectorAll('div[class="release-date-image-wrapper"] > a')
    images.forEach(image => {
      sneakerdb.count.imageUrl = image
        sneakerdb.count++
    })
      sneakerdb.count = 0
    let names = document.querySelectorAll('div[class="release-date-title"] > a')
      names.forEach(name => {
        sneakerdb.count.name = name
        sneakerdb.count++
      })
      sneakerdb.count = 0
    let prices = document.querySelectorAll('div[class="release-price"]')
      prices.forEach(price => {
        sneakerdb.count.price = price
        sneakerdb.count++
      })} catch (err) {console.log(err)}
      console.log('sneakerdb >>> ', sneakerdb)
    return {
      images,
      names,
      prices
    }
  })
  console.log(data, sneakerdb)
  await browser.close()
}

sneakerScraper()
