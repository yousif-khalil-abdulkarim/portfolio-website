'use client'

import { Pagination } from '@/components/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { field, pageSize } from './_shared'

export type WorkExperiencePaginationProps = {
  totalPages: number
}
export function WorkExperiencePagination({ totalPages }: WorkExperiencePaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  let page = Number(searchParams.get(field) ?? '1')
  if (Number.isNaN(page)) {
    page = 1
  }
  return (
    <>
      {totalPages > 1 && (
        <Pagination
          mt="8"
          width="fit-content"
          mx="auto"
          count={totalPages}
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
