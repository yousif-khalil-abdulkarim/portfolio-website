import type { CollectionConfig } from 'payload'

export const Images: CollectionConfig = {
  slug: 'images',
  admin: {
    hideAPIURL: true,
  },
  upload: {
    staticDir: 'images',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['jpg', 'jpeg', 'png'].map((fileType) => `image/${fileType}`),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
