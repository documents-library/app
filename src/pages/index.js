import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(
    () =>
      router.push(
        '/taller@/my.site/?folderId=15YhjG7V10TSDgg25_lItgld0M4qzDfWS'
      ),
    []
  )

  return null
}
