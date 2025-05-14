import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className=" h-full justify-center">
        <h1 className="text-6xl font-bold text-center mb-3">
          Discover & Share <br />
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="text-center mb-8">Promptopia is an open-sources AI prompting tool for modern world to discover, create and share creative prompts</p>
        <Feed />
      </main>

      <Footer />
    </div>
  );
}
