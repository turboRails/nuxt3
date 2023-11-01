import test from 'node:test'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
      <div className="flex min-h-screen flex-col justify-center antialiased sm:py-12">
          <div className="absolute inset-0 bg-[url(/img/endless-constellation.svg)] bg-center"></div>
          {children}
          </div>
      </body>
    </html>
  )
}
