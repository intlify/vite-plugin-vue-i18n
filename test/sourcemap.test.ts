import { bundleAndRun } from './utils'

test('i18n custom block only', async () => {
  const { map } = await bundleAndRun('basic.vue', { sourcemap: true })
  expect(map.mappings).toMatchSnapshot()
})

test('fully blocks', async () => {
  const { map } = await bundleAndRun('fully-block.vue', { sourcemap: true })
  expect(map.mappings).toMatchSnapshot()
})
