import { privateAccess } from '@/authorization/privateAccess'
import { publicAccess } from '@/authorization/publicAccess'
import { richTextEditor } from '@/utilities/richTextEditor'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'projectTitle',
  },
  access: {
    create: privateAccess,
    read: publicAccess,
    update: privateAccess,
    delete: privateAccess,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: 'Project title',
          name: 'projectTitle',
          type: 'text',
          required: true,
        },
        {
          label: 'Role',
          name: 'role',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'row',
          fields: [
            {
              label: 'Start date',
              name: 'startDate',
              type: 'date',
              required: false,
            },
            {
              label: 'End date',
              name: 'endDate',
              type: 'date',
              required: false,
            },
            {
              admin: {
                style: {
                  marginTop: 'auto',
                },
              },
              label: 'Current',
              name: 'current',
              type: 'checkbox',
              required: false,
            },
          ],
        },
      ],
    },
    {
      label: 'Project link',
      type: 'text',
      name: 'projectLink',
      required: false,
    },
    {
      label: 'Github link',
      type: 'text',
      name: 'githubLink',
      required: false,
    },
    {
      label: 'Image',
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      displayPreview: true,
      required: false,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'richText',
      editor: richTextEditor,
      required: false,
    },
    {
      label: 'Skills',
      type: 'collapsible',
      fields: [
        {
          name: 'skills',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
