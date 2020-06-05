import { bundleAndRun } from './utils'

test('basic', async () => {
  const { module } = await bundleAndRun('basic.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    }
  ])
})

test('yaml', async () => {
  const { module } = await bundleAndRun('yaml.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    }
  ])
})

test('json5', async () => {
  const { module } = await bundleAndRun('json5.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    }
  ])
})

test('import', async () => {
  const { module } = await bundleAndRun('import.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    }
  ])
})

test('multiple', async () => {
  const { module } = await bundleAndRun('multiple.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    },
    {
      ja: {
        hello: 'こんにちは、世界！'
      }
    }
  ])
})

test('locale', async () => {
  const { module } = await bundleAndRun('locale.vue')
  expect(module.__i18n).toMatchObject([
    {
      ja: {
        hello: 'こんにちは、世界！'
      }
    }
  ])
})

test('locale attr and basic', async () => {
  const { module } = await bundleAndRun('locale-mix.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    },
    {
      ja: {
        hello: 'こんにちは、世界！'
      }
    }
  ])
})

test('locale attr and import', async () => {
  const { module } = await bundleAndRun('locale-import.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello world!'
      }
    }
  ])
})

test('special characters', async () => {
  const { module } = await bundleAndRun('special-char.vue')
  expect(module.__i18n).toMatchObject([
    {
      en: {
        hello: 'hello\ngreat\t"world"'
      }
    }
  ])
})
