import { useState } from 'react'
import logo from '@/assets/logo/spotify.png'
import { Button } from '@/components/ui/button'
import { regAccount } from '@/services/AuthenticateServices'
import { Link, useNavigate } from 'react-router'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [emailError, setEmailError] = useState("") // ✅ Thêm state cho lỗi email

  const navigate = useNavigate() // ✅ khởi tạo navigate
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("") // Xóa lỗi cũ mỗi lần submit

    const data = {
      email,
      password,
      full_name: fullName,
      role_id: 1
    }

    try {
      const response = await regAccount(data)
      console.log("response success:", response)
      // TODO: redirect or show message
        
      navigate("/login")

    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = error.response.data
        if (errors.email && Array.isArray(errors.email)) {
          setEmailError(errors.email[0]) // ✅ Gán lỗi từ API
        }
      }
      console.error("Register failed:", error)
    }
  }

  return (
    <section className="bg-zinc-950">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-zinc-300 ">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Spotify
        </a>
        <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng ký để bắt đầu nghe
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                <input type="text" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input autoComplete='username' type="email" id="email" className={`bg-gray-50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input  autoComplete="current-password" type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <Button type="submit" className="w-full cursor-pointer bg-zinc-950 text-zinc-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng kí</Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Bạn đã có tài khoản? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
