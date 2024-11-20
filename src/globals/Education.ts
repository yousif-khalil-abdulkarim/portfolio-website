import { privateAccess } from '@/authorization/privateAccess'
import { publicAccess } from '@/authorization/publicAccess'
import { richTextEditor } from '@/utilities/richTextEditor'
import type { GlobalConfig } from 'payload'

export const Education: GlobalConfig = {
  slug: 'education',
  admin: {
    hideAPIURL: true,
  },
  access: {
    read: publicAccess,
    update: privateAccess,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: 'Institution',
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          label: 'Degree',
          name: 'degree',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Location',
          name: 'location',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          type: 'row',
          admin: {
            width: '100%',
          },
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
      label: 'Description',
      name: 'description',
      type: 'richText',
      editor: richTextEditor,
      required: false,
    },
  ],
}
