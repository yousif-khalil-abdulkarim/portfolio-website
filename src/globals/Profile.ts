import type { Profile as ProfileType } from '@/payload-types'
import { richTextEditor } from '@/utilities/richTextEditor'
import type { FieldHookArgs, GlobalConfig, Validate } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  admin: {
    hideAPIURL: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: 'First name',
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Role',
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          admin: {
            width: '50%',
          },
          label: 'Role description',
          name: 'roleDescription',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Mobile number',
          name: 'mobileNumber',
          type: 'text',
          required: true,
        },
        {
          label: 'Email',
          name: 'email',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Linkedin',
          name: 'linkedin',
          type: 'text',
          required: true,
        },
        {
          label: 'Github',
          name: 'github',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      label: 'Portrait image',
      name: 'portraitImage',
      type: 'upload',
      relationTo: 'images',
      displayPreview: true,
      required: true,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'richText',
      editor: richTextEditor,
      required: true,
    },
    {
      label: 'Description summary',
      name: 'descriptionSummary',
      type: 'textarea',
      maxLength: 200,
      required: false,
      hooks: {
        beforeChange: [
          ({ value }: FieldHookArgs<ProfileType, string>) => {
            if (!value) {
              return
            }
            return value.trim()
          },
        ],
      },
    },
  ],
}
