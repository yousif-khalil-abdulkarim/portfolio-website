// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { WorkExperiences } from './collections/WorkExperiences'
import { Projects } from './collections/Projects'
import { Images } from './collections/Images'
import { Profile } from './globals/Profile'
import { Education } from './globals/Education'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { PAYLOAD_SECRET, DATABASE_URI } = process.env
if (PAYLOAD_SECRET === undefined) {
  throw new Error('process.env.PAYLOAD_SECRET is undefined')
}
if (DATABASE_URI === undefined) {
  throw new Error('process.env.DATABASE_URI is undefined')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, WorkExperiences, Projects, Images],
  globals: [Profile, Education],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
