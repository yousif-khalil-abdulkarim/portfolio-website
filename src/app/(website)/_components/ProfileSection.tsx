import { Box, HStack, VStack } from 'styled-system/jsx'
import { Text } from '@/components/text'
import { Heading } from '@/components/heading'
import { Skeleton } from '@/components/skeleton'
import payloadConfig from '@/payload.config'
import type { Image } from '@/payload-types'
import { getPayload } from 'payload'
import { RenderRichText } from '@/utilities/RenderRichText'
import NextImage from 'next/image'
import { css } from 'styled-system/css'
import { Suspense } from 'react'
import type { ImageFields } from '@/types/ImageFields'
import { IconButton } from '@/components/icon-button'
import NextLink from 'next/link'
import { SiLinkedin, SiGithub } from '@icons-pack/react-simple-icons'
import { Link } from '@/components/link'
import { DateText } from './_copmonents/DateText'

function handleImageData(profileImage: Image | number): ImageFields {
  if (typeof profileImage === 'number') {
    throw new Error('profileImage should be an object')
  }
  const imageHeight = profileImage.sizes?.card?.height
  if (typeof imageHeight !== 'number') {
    throw new Error('profileImage.sizes?.card?.height should be a number')
  }
  const imageWidth = profileImage.sizes?.card?.width
  if (typeof imageWidth !== 'number') {
    throw new Error('profileImage.sizes?.card?.width should be a number')
  }
  const imageUrl = profileImage.sizes?.card?.url
  if (typeof imageUrl !== 'string') {
    throw new Error('profileImage.sizes?.card?.url should be a string')
  }
  const imageAlt = profileImage.alt ?? ''
  return {
    imageHeight,
    imageWidth,
    imageUrl,
    imageAlt,
  }
}
function PortraitImageSkeleton() {
  return <Skeleton h="xs" w="xs" borderRadius="md" mb="auto" />
}
async function PortraitImage() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { portraitImage } = await payload.findGlobal({
    slug: 'profile',
    select: {
      portraitImage: true,
    },
  })
  const { imageAlt, imageHeight, imageUrl, imageWidth } = handleImageData(portraitImage)
  return (
    <HStack maxH="xs" h="100%" w="xs" borderRadius="md" overflow="hidden" mb="auto">
      <NextImage
        priority
        className={css({
          objectFit: 'cover',
          objectPosition: 'center',
          flexGrow: 0,
          flexShrink: 1,
          display: 'block',
        })}
        height={imageHeight}
        width={imageWidth}
        src={imageUrl}
        alt={imageAlt!}
      />
    </HStack>
  )
}

function HeaderSkeleton() {
  return (
    <Box mb="8">
      <Skeleton w="xs" h="12" mb="2" />
      <Skeleton w="48" h="8" mb="6" />
      <Skeleton w="64" h="4" mb="2" />
      <Skeleton w="48" h="4" />
    </Box>
  )
}
async function Header() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { firstName, lastName, role, roleDescription } = await payload.findGlobal({
    slug: 'profile',
    select: {
      firstName: true,
      lastName: true,
      role: true,
      roleDescription: true,
    },
  })
  return (
    <Box>
      <Heading size="5xl" as="h1">{`${firstName} ${lastName}`}</Heading>
      <Heading size="2xl" as="h2">
        {role}
      </Heading>
      <Text mt="2" maxW="xs">
        {roleDescription}
      </Text>
    </Box>
  )
}

function DescriptionSkeleton() {
  return (
    <Box w="100%" maxW="2xl">
      {Array(6)
        .fill('')
        .map((_, index) => (
          <Skeleton key={index.toString()} w="100%" h="4" mb="2" />
        ))}
    </Box>
  )
}
async function Description() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { description } = await payload.findGlobal({
    slug: 'profile',
    select: {
      description: true,
    },
  })
  return <RenderRichText state={description as any} />
}

function ContactSkeleton() {
  return (
    <VStack
      gap={{
        base: '4',
        mdDown: '2',
      }}
      alignItems="start"
    >
      <Skeleton />
      <VStack w="100%" gap="3" alignItems="start">
        <Box>
          <Skeleton />
          <Skeleton />
        </Box>
      </VStack>
    </VStack>
  )
}
async function Contact() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { email, mobileNumber } = await payload.findGlobal({
    slug: 'profile',
    select: {
      email: true,
      mobileNumber: true,
    },
  })
  return (
    <VStack gap="2" alignItems="start">
      <Box>
        <Heading as="div" size="lg">
          Mobilenumber
        </Heading>
        <Link color="fg.subtle" asChild>
          <NextLink href={`tel:${mobileNumber}`}>{mobileNumber}</NextLink>
        </Link>
      </Box>
      <Box>
        <Heading as="div" size="lg">
          Email
        </Heading>
        <Link color="fg.subtle" asChild>
          <NextLink href={`mailto:${email}`}>{email}</NextLink>
        </Link>
      </Box>
    </VStack>
  )
}

function LinksSkeleton() {
  return <>Loading !!!</>
}
async function Links() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { linkedin, github } = await payload.findGlobal({
    slug: 'profile',
    select: {
      linkedin: true,
      github: true,
    },
  })
  return (
    <VStack gap="2" alignItems="start">
      <Heading as="div" size="xl">
        Social media
      </Heading>
      <HStack w="100%" gap="2">
        <IconButton asChild variant="ghost">
          <NextLink href={linkedin} target="_blank">
            <SiLinkedin />
          </NextLink>
        </IconButton>
        <IconButton asChild variant="ghost">
          <NextLink href={github} target="_blank">
            <SiGithub />
          </NextLink>
        </IconButton>
      </HStack>
    </VStack>
  )
}

function EducationSkeleton() {
  return <>Loading!!!</>
}
async function Education() {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const { description, institution, location, degree, startDate, endDate, current } =
    await payload.findGlobal({
      slug: 'education',
    })
  return (
    <Box>
      <Heading as="div" size="lg">
        Education
      </Heading>
      <Box>
        <Text color="fg.muted" fontSize="sm">
          {degree}, {institution} - {location}
        </Text>
        <DateText startDate={startDate} endDate={endDate} current={current} />
        {description && <RenderRichText state={description as any} />}
      </Box>
    </Box>
  )
}

function ProfileSectionMobile() {
  return (
    <VStack alignItems="center" gap="16">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <Suspense fallback={<PortraitImageSkeleton />}>
        <PortraitImage />
      </Suspense>
      <Suspense fallback={<DescriptionSkeleton />}>
        <Description />
      </Suspense>
      <VStack alignItems="stretch" gap="16" mr="auto">
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<LinksSkeleton />}>
          <Links />
        </Suspense>
      </VStack>
    </VStack>
  )
}
function ProfileSectionDesktop() {
  return (
    <HStack alignItems="start" gap="16">
      <VStack flexShrink="1" flexGrow="0" gap="6">
        <Suspense fallback={<PortraitImageSkeleton />}>
          <PortraitImage />
        </Suspense>
        <VStack mr="auto" alignItems="start" gap="6">
          <Suspense fallback={<ContactSkeleton />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<LinksSkeleton />}>
            <Links />
          </Suspense>
        </VStack>
      </VStack>
      <VStack w="100%" maxW="2xl" gap="6" alignItems="start">
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        <Suspense fallback={<DescriptionSkeleton />}>
          <Description />
        </Suspense>
        <Suspense fallback={<EducationSkeleton />}>
          <Education />
        </Suspense>
      </VStack>
    </HStack>
  )
}

export async function ProfileSection() {
  return (
    <>
      <Box
        display={{
          mdDown: 'block',
          base: 'none',
        }}
      >
        <ProfileSectionMobile />
      </Box>
      <Box
        display={{
          mdDown: 'none',
          base: 'block',
        }}
      >
        <ProfileSectionDesktop />
      </Box>
    </>
  )
}
