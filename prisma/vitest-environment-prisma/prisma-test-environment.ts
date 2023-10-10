import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Executou')

    return {
      teardown() {
        console.log('Teardown')
      },
    }
  },
}
