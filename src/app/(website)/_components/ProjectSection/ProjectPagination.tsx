'use client'

import { Project } from '@/payload-types'
import { Pagination } from '@/components/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { PaginatedDocs } from 'payload'
import { field, pageSize } from './_shared'

export type ProjectPaginationProps = {
  paginatedDocs: PaginatedDocs<Project>
}
export function ProjectPagination({ paginatedDocs }: ProjectPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  let page = Number(searchParams.get(field) ?? '1')
  if (Number.isNaN(page)) {
    page = 1
  }
  return (
    <>
      {paginatedDocs.totalPages > 1 && (
        <Pagination
          mt="8"
          width="fit-content"
          mx="auto"
          count={paginatedDocs.totalPages}
          siblingCount={1}
          pageSize={pageSize}
          page={page}
          onPageChange={({ page }) => {
            console.log('page:', page)
            router.push(`?${field}=${page}`, {})
          }}
        />
      )}
    </>
  )
}
