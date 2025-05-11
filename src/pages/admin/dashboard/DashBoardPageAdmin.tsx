
const DashBoardPageAdmin = () => {
  return (
    <>
    <div className="min-h-screen bg-black text-white">
                    {/* Navigation */}
                    {/* <nav className="bg-black px-6 py-4 fixed w-full z-50">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="text-2xl font-bold text-green-500">Spotify</div>
                            <div className="flex space-x-6">
                                <a href="#" className="hover:text-green-500">Sign up</a>
                                <a href="#" className="hover:text-green-500">Log in</a>
                            </div>
                        </div>
                    </nav> */}

                    {/* Hero Section */}
                    <div className="bg-gradient-to-b from-green-500 to-black">
                        <div className="container mx-auto px-6 py-40 text-center">
                            <h1 className="text-5xl font-bold mb-8">Listening is everything</h1>
                            <p className="text-xl mb-12">Millions of songs and podcasts. No credit card needed.</p>
                            <button className="bg-white text-black px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                                GET SPOTIFY FREE
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container mx-auto px-6 py-20">
                        <h2 className="text-4xl font-bold text-center mb-16">Why Spotify?</h2>
                        
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🎵</div>
                                <h3 className="text-2xl font-bold mb-4">Play your favorites</h3>
                                <p className="text-gray-400">Listen to the songs you love, and discover new music and podcasts.</p>
                            </div>

                            <div className="text-center">
                                <div className="text-6xl mb-4">📱</div>
                                <h3 className="text-2xl font-bold mb-4">Playlists made easy</h3>
                                <p className="text-gray-400">We'll help you make playlists. Or enjoy playlists made by music experts.</p>
                            </div>

                            <div className="text-center">
                                <div className="text-6xl mb-4">❤️</div>
                                <h3 className="text-2xl font-bold mb-4">Make it yours</h3>
                                <p className="text-gray-400">Tell us what you like, and we'll recommend music for you.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gray-900 py-8">
                        <div className="container mx-auto px-6 text-center text-gray-400">
                            <p>© 2023 Spotify AB</p>
                        </div>
                    </footer>
                </div>
    </>
  )
}

export default DashBoardPageAdmin

