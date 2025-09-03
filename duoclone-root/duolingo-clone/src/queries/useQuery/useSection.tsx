import { useQuery } from '@tanstack/react-query'
import { qk } from '../queryKeys'
import { sectionBatcher } from '../batcher/sectionBatcher'

export function useSection(id: number) {
  return useQuery({
    queryKey: qk.section(id),
    queryFn: () => sectionBatcher.fetch(id!),
  })
}
