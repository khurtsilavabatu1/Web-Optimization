import { test, expect } from '@playwright/test'

// ===========================================
//  ტესტი 1: Viewport Meta Tag
//  შემოწმება — index.html-ში არის viewport tag?
// ===========================================
test('viewport meta tag უნდა არსებობდეს', async ({ page }) => {
  await page.goto('/')

  const viewport = page.locator('meta[name="viewport"]')
  await expect(viewport).toHaveAttribute('content', /width=device-width/)
})

// ===========================================
//  ტესტი 2: ჰორიზონტალური Scroll არ უნდა იყოს
//  თუ კონტენტი ეკრანს სცილდება — ეს ბაგია
// ===========================================
test('ჰორიზონტალური scroll არ უნდა იყოს', async ({ page }) => {
  await page.goto('/')

  const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
  const viewportWidth = await page.evaluate(() => window.innerWidth)

  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
})

// ===========================================
//  ტესტი 3: Hero სექცია — ხილვადობა
//  სათაური და ღილაკები უნდა ჩანდეს
// ===========================================
test('Hero სექციის სათაური და ღილაკები ხილულია', async ({ page }) => {
  await page.goto('/')

  const heroTitle = page.locator('.hero-title')
  await expect(heroTitle).toBeVisible()
  await expect(heroTitle).toContainText('თანამედროვე ვებ ტექნოლოგიები')

  const primaryBtn = page.locator('.hero-actions .btn-primary')
  await expect(primaryBtn).toBeVisible()
})

// ===========================================
//  ტესტი 4: Touch Target — ღილაკების ზომა
//  ყველა ღილაკი მინიმუმ 44px უნდა იყოს
// ===========================================
test('ღილაკების touch target მინიმუმ 44px უნდა იყოს', async ({ page }) => {
  await page.goto('/')

  const buttons = page.locator('.btn')
  const count = await buttons.count()

  for (let i = 0; i < count; i++) {
    const box = await buttons.nth(i).boundingBox()
    if (box) {
      expect(box.height, `ღილაკი #${i + 1} — სიმაღლე ${box.height}px`).toBeGreaterThanOrEqual(44)
    }
  }
})

// ===========================================
//  ტესტი 5: Newsletter Input — font-size >= 16px
//  16px-ზე ნაკლები iOS-ზე auto-zoom-ს იწვევს
// ===========================================
test('Newsletter input font-size მინიმუმ 16px უნდა იყოს', async ({ page }) => {
  await page.goto('/')

  const input = page.locator('.newsletter-input')
  const fontSize = await input.evaluate((el) => {
    return parseFloat(window.getComputedStyle(el).fontSize)
  })

  expect(fontSize, `Input font-size: ${fontSize}px — მინიმუმ 16px უნდა იყოს`).toBeGreaterThanOrEqual(16)
})

// ===========================================
//  ტესტი 6: Newsletter ფორმის ფუნქციონალობა
//  ელ-ფოსტა შეიყვანე → გამოწერა დააჭირე → success
// ===========================================
test('Newsletter ფორმა მუშაობს — გამოწერის შემდეგ success ჩანს', async ({ page }) => {
  await page.goto('/')

  const input = page.locator('.newsletter-input')
  const submitBtn = page.locator('.newsletter-form .btn')

  await input.fill('test@example.com')
  await submitBtn.click()

  const success = page.locator('.newsletter-success')
  await expect(success).toBeVisible()
  await expect(success).toContainText('გმადლობთ')
})

// ===========================================
//  ტესტი 7: Body font-size მინიმუმ 16px
//  12px ტექსტი მობილურზე წაუკითხავია
// ===========================================
test('Body font-size მინიმუმ 16px უნდა იყოს', async ({ page }) => {
  await page.goto('/')

  const fontSize = await page.evaluate(() => {
    return parseFloat(window.getComputedStyle(document.body).fontSize)
  })

  expect(fontSize, `Body font-size: ${fontSize}px`).toBeGreaterThanOrEqual(16)
})

// ===========================================
//  ტესტი 8: სურათები/ელემენტები არ უნდა overflow-ებდეს
//  ფიქსირებული width-ის ელემენტი ეკრანს სცილდება
// ===========================================
test('არცერთი ელემენტი არ უნდა სცილდებოდეს viewport-ს', async ({ page }) => {
  await page.goto('/')

  const overflowingElements = await page.evaluate(() => {
    const viewportWidth = window.innerWidth
    const all = document.querySelectorAll('*')
    const overflows = []

    for (const el of all) {
      const rect = el.getBoundingClientRect()
      if (rect.right > viewportWidth + 1) {
        overflows.push({
          tag: el.tagName,
          className: el.className,
          right: Math.round(rect.right),
          viewportWidth,
        })
      }
    }
    return overflows
  })

  expect(
    overflowingElements,
    `${overflowingElements.length} ელემენტი სცილდება ეკრანს: ${JSON.stringify(overflowingElements.slice(0, 3))}`
  ).toHaveLength(0)
})

// ===========================================
//  ტესტი 9: Navbar — მობილურ მენიუს hamburger აქვს
//  768px-ზე ნაკლებ ეკრანზე hamburger უნდა ჩანდეს
// ===========================================
test('მობილურზე hamburger მენიუ ჩანს და მუშაობს', async ({ page, viewport }) => {
  await page.goto('/')

  if (viewport && viewport.width < 768) {
    const hamburger = page.locator('.hamburger')
    await expect(hamburger).toBeVisible()

    await hamburger.click()

    const navMenu = page.locator('.nav-menu')
    await expect(navMenu).toHaveClass(/active/)

    const firstLink = page.locator('.nav-menu a').first()
    await expect(firstLink).toBeVisible()
  }
})

// ===========================================
//  ტესტი 10: Footer ბმულების touch target
//  footer-ის ბმულებიც 44px უნდა იყოს
// ===========================================
test('Footer ბმულები touch-friendly უნდა იყოს (min-height 44px)', async ({ page }) => {
  await page.goto('/')

  const footerLinks = page.locator('.footer-links a')
  const count = await footerLinks.count()

  for (let i = 0; i < count; i++) {
    const box = await footerLinks.nth(i).boundingBox()
    if (box) {
      expect(
        box.height,
        `Footer ბმული #${i + 1} — სიმაღლე ${box.height}px`
      ).toBeGreaterThanOrEqual(44)
    }
  }
})

// ===========================================
//  ტესტი 11: Article Grid — responsive layout
//  მობილურზე 1 სვეტი, ტაბლეტზე 2, desktop-ზე 3
// ===========================================
test('Article Grid სვეტების რაოდენობა viewport-ს ერგება', async ({ page, viewport }) => {
  await page.goto('/')

  const columns = await page.evaluate(() => {
    const grid = document.querySelector('.article-grid')
    return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length
  })

  if (viewport && viewport.width < 576) {
    expect(columns, `მობილურზე (${viewport.width}px) 1 სვეტი უნდა იყოს`).toBe(1)
  } else if (viewport && viewport.width < 1200) {
    expect(columns, `ტაბლეტზე (${viewport.width}px) 2 სვეტი უნდა იყოს`).toBe(2)
  } else {
    expect(columns, `Desktop-ზე (${viewport.width}px) 3 სვეტი უნდა იყოს`).toBe(3)
  }
})
