import '../../globals.css'
import payloadConfig from '@/payload.config'
import { richTextToString } from '@/utilities/richTextToString'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import { ThemeButton } from '../_components/theme-button'
import { Box } from 'styled-system/jsx'
import { cookies as getCookies } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({
    config: payloadConfig,
  })
  let {
    firstName,
    lastName,
    description,
    descriptionSummary,
    portraitImage,
    linkedin,
    email,
    mobileNumber,
  } = await payload.findGlobal({
    slug: 'profile',
    depth: 1,
    select: {
      roleDescription: false,
    },
  })
  const fullName = `${firstName} ${lastName}`
  const title = `${fullName} - portfolio`
  if (typeof portraitImage === 'number') {
    throw new Error('profileImage should be an object')
  }
  let { url: imageUrl } = portraitImage
  if (imageUrl === undefined || imageUrl === null) {
    throw new Error('imageUrl should be a string')
  }

  const descriptionText = richTextToString(description as any)
  if (!descriptionSummary) {
    descriptionSummary = descriptionText.slice(0, 200) + '...'
  }
  // imageUrl = `http://localhost:3000${imageUrl}`
  return {
    title,
    openGraph: {
      type: 'profile',
      firstName,
      lastName,
      gender: 'male',
      countryName: 'Sweden',
      description: descriptionSummary,
      emails: email,
      phoneNumbers: mobileNumber.toString(),
      images: {
        url: imageUrl,
        alt: 'Portrait image',
      },
    },
    twitter: {
      title,
      creator: fullName,
      description: descriptionSummary,
      images: {
        url: imageUrl,
        alt: 'Portrait image',
      },
    },
    authors: [
      {
        name: fullName,
        url: linkedin,
      },
    ],
    keywords: [
      'Frontend developer',
      'Backend developer',
      'React developer',
      'Node Js developer',
      'Javascript developer',
      'Typescript developer',
    ],
    publisher: fullName,
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookies = await getCookies()
  const theme = cookies.get('theme')
  return (
    <html>
      <body className={theme?.value === 'dark' ? 'dark' : undefined}>
        <Box position="fixed" top="0" right="0" padding="10">
          <ThemeButton initialIsDark={theme?.value === 'dark'} />
        </Box>
        {children}
      </body>
    </html>
  )
}
