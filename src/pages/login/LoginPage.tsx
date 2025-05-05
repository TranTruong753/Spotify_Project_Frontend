import { useState } from 'react'
import logo from '@/assets/logo/spotify.png'
import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { getAlbumsFavorite, getAlbumsUser, login } from '@/features/accounts/authSlice'
import { useNavigate } from 'react-router'

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { error, isAuthenticated } = useSelector((state: RootState) => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await dispatch(login({ email, password }))
        if (login.fulfilled.match(result)) {
            const userId = result.payload.user?.id; // Lấy id của user từ response
            if (userId) {
              dispatch(getAlbumsFavorite(userId)); // Gọi getAlbumsFavorite sau khi login thành công
              dispatch(getAlbumsUser(userId));
            }
            navigate('/') // hoặc điều hướng đến dashboard
        }
    }

    return (
        <section className="bg-zinc-950">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-zinc-300">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Spotify
                </a>
                <div className="w-full bg-gray-50 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <Button variant="outline" className="w-full mb-7 h-12">
                            <FaGoogle /> Login with Google
                        </Button>
                        <span className="block w-full border border-gray-200"></span>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">
                                    {error.detail || error.message || 'An unknown error occurred.'}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-zinc-950 text-white hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Sign in
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
