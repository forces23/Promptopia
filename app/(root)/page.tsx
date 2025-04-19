import Feeds from "@components/Feeds"


const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        {/* <br /> */}
        <span className='orange_gradient'> AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>Promptopia is an open-sources AI prompting tool for modern world to discover, create and share creative prompts</p>

      <Feeds />
    </section>
  )
}

export default Home