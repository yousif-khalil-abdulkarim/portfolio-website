import { privateAccess } from '@/authorization/privateAccess'
import { publicAccess } from '@/authorization/publicAccess'
import { richTextEditor } from '@/utilities/richTextEditor'
import type { CollectionConfig } from 'payload'

export const WorkExperiences: CollectionConfig = {
  slug: 'workExperiences',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'jobTitle',
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
          label: 'Job title',
          name: 'jobTitle',
          type: 'text',
          required: true,
        },
        {
          label: 'Employer',
          name: 'employer',
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
      label: 'Type',
      name: 'type',
      type: 'radio',
      options: ['School', 'Job', 'Internship', 'Freelance'],
      required: true,
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
