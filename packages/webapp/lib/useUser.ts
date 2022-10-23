import useSWR from 'swr'
import { fetcher } from './fetcher'

type User = {
  id: number,
  email: string,
  name: string,
}

export default function useUser() {
  const { data: user, error } = useSWR<User, Error>('/me', fetcher, { errorRetryCount: 0 })

  return {
    user,
    error,
    isLoading: !user && !error,
  }
}
