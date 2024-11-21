import { Heading } from '@/components/heading'
import type { Project } from '@/payload-types'
import { SearchParams } from 'next/dist/server/request/search-params'
import { Box, HStack, VStack } from 'styled-system/jsx'
import { ProjectPagination } from './ProjectPagination'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { field, pageSize } from './_shared'
import { Card } from '@/components/card'
import { Badge } from '@/components/badge'
import { RenderRichText } from '@/utilities/RenderRichText'
import { Skeleton } from '@/components/skeleton'
import { Suspense } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Link } from '@/components/link'
import type { Image } from '@/payload-types'
import type { ImageFields } from '@/types/ImageFields'
import { css } from 'styled-system/css'
import { DateText } from '../_copmonents/DateText'

function handleImageData(image: Image | number | null | undefined): ImageFields | null {
  if (image === undefined || image === null) {
    return null
  }
  if (typeof image === 'number') {
    throw new Error('image should be an object')
  }
  const imageHeight = image.sizes?.tablet?.height
  if (typeof imageHeight !== 'number') {
    throw new Error('image.sizes?.tablet?.height should be a number')
  }
  const imageWidth = image.sizes?.tablet?.width
  if (typeof imageWidth !== 'number') {
    throw new Error('image.sizes?.tablet?.width should be a number')
  }
  const imageUrl = image.sizes?.tablet?.url
  if (typeof imageUrl !== 'string') {
    throw new Error('image.sizes?.tablet?.url should be a string')
  }
  const imageAlt = image.alt ?? ''
  return {
    imageHeight,
    imageWidth,
    imageUrl,
    imageAlt,
  }
}
function ProjectItem(props: Project) {
  const image = handleImageData(props.image)
  return (
    <Card.Root width="100%">
      <Card.Header>
        <Card.Title>{props.projectTitle}</Card.Title>
        <Card.Description>
          <Box>{props.role}</Box>
          <DateText startDate={props.startDate} endDate={props.endDate} current={props.current} />
        </Card.Description>
      </Card.Header>
      <Card.Body gap="4">
        {image && (
          <NextImage
            className={css({
              width: '100%',
              maxWidth: '2xl',
              margin: 'auto',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              aspectRatio: '2560 / 1283',
            })}
            height={image.imageHeight}
            width={image.imageWidth}
            src={image.imageUrl}
            alt={image.imageAlt!}
          />
        )}

        {props.description && <RenderRichText fontSize="sm" state={props.description as any} />}

        {(props.projectLink || props.githubLink) && (
          <HStack gap="8">
            {props.projectLink && (
              <Link asChild>
                <NextLink href={props.projectLink} target="blank">
                  Link to project
                </NextLink>
              </Link>
            )}
            {props.githubLink && (
              <Link asChild>
                <NextLink href={props.githubLink} target="_blank">
                  Link to github
                </NextLink>
              </Link>
            )}
          </HStack>
        )}
      </Card.Body>
      <Card.Footer justifyContent="start">
        {props.skills && (
          <HStack flexWrap="wrap" gap="2" alignItems="start" justifyContent="start">
            {props.skills.map((skill) => (
              <Badge key={skill.id}>{skill.name}</Badge>
            ))}
          </HStack>
        )}
      </Card.Footer>
    </Card.Root>
  )
}

type ProjectListProps = {
  items: Project[]
}
function ProjectList({ items }: ProjectListProps) {
  return (
    <VStack w="100%">
      {items.map((item) => (
        <ProjectItem key={item.id} {...item} />
      ))}
    </VStack>
  )
}

export type ProjectSectionProps = {
  searchParams: SearchParams
}
async function ProjectSectionLoaded({ searchParams }: ProjectSectionProps) {
  const payload = await getPayload({
    config: payloadConfig,
  })
  let page = Number(searchParams[field] ?? '1')
  if (Number.isNaN(page)) {
    page = 1
  }
  const paginatedDocs = await payload.find({
    collection: 'projects',
    sort: 'createdAt',
    limit: pageSize,
    page,
    pagination: true,
  })
  return (
    <>
      {paginatedDocs.totalDocs !== 0 && (
        <Box py="8">
          <Heading ml="4" size="3xl" mx="auto" mb="4" as="div">
            Projects
          </Heading>
          <ProjectList items={paginatedDocs.docs} />
          <ProjectPagination paginatedDocs={paginatedDocs} />
        </Box>
      )}
    </>
  )
}

function ProjectItemSkeleton() {
  return (
    <Box w="100%" p="7" bg="bg.muted">
      <Skeleton w="sm" h="6" mb="3" />
      <Skeleton w="64" h="3" mb="3" />
      <Skeleton w="36" h="3" mb="3" />
      <Skeleton w="16" h="6" borderRadius="full" mb="8" />

      <Skeleton w="100%" h="3" mb="3" />
      <Skeleton w="100%" h="3" mb="3" />
      <Skeleton w="100%" h="3" mb="8" />

      <HStack>
        <Skeleton w="16" h="6" borderRadius="full" mb="8" />
        <Skeleton w="16" h="6" borderRadius="full" mb="8" />
        <Skeleton w="16" h="6" borderRadius="full" mb="8" />
        <Skeleton w="16" h="6" borderRadius="full" mb="8" />
      </HStack>
    </Box>
  )
}
function ProjectPaginationSkeleton() {
  return (
    <HStack mx="auto" mt="8" w="fit-content">
      <Skeleton h="10" w="10" />
      <Skeleton h="10" w="10" />
      <Skeleton h="10" w="10" />
      <Skeleton h="10" w="10" />
      <Skeleton h="10" w="10" />
    </HStack>
  )
}
function ProjectSectionSkeleton() {
  return (
    <Box py="8">
      <Skeleton ml="4" mx="auto" mb="4" h="8" w="64" />
      <VStack w="100%">
        <ProjectItemSkeleton />
      </VStack>
      <ProjectPaginationSkeleton />
    </Box>
  )
}

export function ProjectSection({ searchParams }: ProjectSectionProps) {
  return (
    <Suspense fallback={<ProjectSectionSkeleton />}>
      <ProjectSectionLoaded searchParams={searchParams} />
    </Suspense>
  )
}
