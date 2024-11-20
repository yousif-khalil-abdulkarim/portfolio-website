import type { SearchParams } from 'next/dist/server/request/search-params'
import type { Params } from 'next/dist/server/request/params'

export type PageProps = {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}
