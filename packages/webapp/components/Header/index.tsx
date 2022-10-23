import type { NextPage } from 'next'
import useUser from '../../lib/useUser'
import SigninButton from './SigninButton'
import SignoutButton from './SignoutButton'

const Header: NextPage = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return null
  }

  return (
    <>
      <header>
        <div>
          <span className="title">Article Picker</span>
          {
            user ? <SignoutButton /> : <SigninButton />
          }
        </div>
      </header>

      <style jsx>{`
        header {
          background-color: white;
          box-shadow: 0 -1rem 1rem 0.5rem black;
        }

        div {
          margin: auto;
          padding: 2rem 10rem 2rem 10rem;
          width: 100%;
          max-width: 160rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-size: 2rem;
        }
      `}</style>
    </>
  )
}

export default Header
