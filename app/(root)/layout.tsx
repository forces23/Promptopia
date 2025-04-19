import { auth } from '@auth';
import AuthProvider from '@components/AuthProvider';
import Nav from '@components/Nav';
import '@styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
        <div className='main'>
          <div className='gradient' />
        </div>

        {/* <main className='app'> */}
        <main className='relative z-10 flex flex-col mx-auto px-6'>
          <Nav session={session}/>
          {children}
        </main>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout