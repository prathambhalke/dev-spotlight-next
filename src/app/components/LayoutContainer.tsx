"use client"
import {ThemeProvider} from "next-themes"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

type Props = {
  children : React.ReactNode
}

const queryClient = new QueryClient();

const LayoutContainer = ({children} : Props) => {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default LayoutContainer
