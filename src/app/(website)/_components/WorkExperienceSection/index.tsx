import { Card } from '@/components/card'
import type { WorkExperience } from '@/payload-types'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { Box, HStack, VStack } from 'styled-system/jsx'
import { Badge } from '@/components/badge'
import { RenderRichText } from '@/utilities/RenderRichText'
import { Heading } from '@/components/heading'
import { SearchParams } from 'next/dist/server/request/search-params'
import { WorkExperiencePagination } from './WorkExperiencePagination'
import { field, pageSize } from './_shared'
import { Suspense } from 'react'
import { Skeleton } from '@/components/skeleton'
import { DateText } from '../_copmonents/DateText'

function WorkExperienceItem(props: WorkExperience) {
  return (
    <Card.Root width="100%">
      <Card.Header>
        <Card.Title>{props.jobTitle}</Card.Title>
        <Card.Description>
          <Box>
            {props.employer} - {props.location}
          </Box>
          <DateText startDate={props.startDate} endDate={props.endDate} current={props.current} />
          <Badge variant="solid">{props.type}</Badge>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        {props.description && <RenderRichText fontSize="sm" state={props.description as any} />}
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

type WorkExperienceListProps = {
  items: WorkExperience[]
}
function WorkExperienceList({ items }: WorkExperienceListProps) {
  return (
    <VStack w="100%">
      {items.map((item) => (
        <WorkExperienceItem key={item.id} {...item} />
      ))}
    </VStack>
  )
}

export type WorkExperienceSectionProps = {
  searchParams: SearchParams
}
async function WorkExperienceSectionLoaded({ searchParams }: WorkExperienceSectionProps) {
  const payload = await getPayload({
    config: payloadConfig,
  })
  let page = Number(searchParams[field] ?? '1')
  if (Number.isNaN(page)) {
    page = 1
  }
  const paginatedDocs = await payload.find({
    collection: 'workExperiences',
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
            Work experience
          </Heading>
          <WorkExperienceList items={paginatedDocs.docs} />
          <WorkExperiencePagination totalPages={paginatedDocs.totalPages} />
        </Box>
      )}
    </>
  )
}

function WorkExperienceItemSkeleton() {
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
function WorkExperiencePaginationSkeleton() {
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
function WorkExperienceSectionSkeleton() {
  return (
    <Box py="8">
      <Skeleton ml="4" mx="auto" mb="4" h="8" w="64" />
      <VStack w="100%">
        <WorkExperienceItemSkeleton />
      </VStack>
      <WorkExperiencePaginationSkeleton />
    </Box>
  )
}

export function WorkExperienceSection({ searchParams }: WorkExperienceSectionProps) {
  return (
    <Suspense fallback={<WorkExperienceSectionSkeleton />}>
      <WorkExperienceSectionLoaded searchParams={searchParams} />
    </Suspense>
  )
}
