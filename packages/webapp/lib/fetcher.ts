const BASE_URL = 'http://localhost:4000'

export const fetcher = async (url: string) => {
  const data = await fetch(`${BASE_URL}${url}`, { credentials: 'include' })

  if (!data.ok) {
    throw new Error(`Fetch Failed: ${data.status}`)
  }

  return data.json()
}
