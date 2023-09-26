import { Link, useNavigate } from 'react-router-dom'

const Navbar = (props: {
    universities:
        | {
              universityShortName: string
          }[]
        | undefined
    currentUniversityShortName: string | undefined
}) => {
    const navigate = useNavigate()
    return props.universities == undefined ? (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-[89px]">
                <Link
                    to="/"
                    className="flex items-center font-[Poppins] text-2xl select-none"
                >
                    <span className="text-green">Ask</span>Senior
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                ></div>
            </div>
        </nav>
    ) : (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-[89px]">
                <Link
                    to="/"
                    className="flex items-center font-[Poppins] text-2xl select-none"
                >
                    <span className="text-green">Ask</span>Senior
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="text-md font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        {props.universities.map((eachUniversity) => (
                            <li>
                                <Link
                                    to={`/${eachUniversity.universityShortName}`}
                                    className={`block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent ${
                                        props.currentUniversityShortName ==
                                        eachUniversity.universityShortName
                                            ? 'md:text-green'
                                            : 'md:text-black'
                                    } md:p-0`}
                                >
                                    {eachUniversity.universityShortName}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {localStorage.getItem('token') == undefined ? (
                                <Link
                                    to="/sign-in"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green md:p-0"
                                >
                                    เข้าสู่ระบบ
                                </Link>
                            ) : (
                                <a
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        navigate(0)
                                    }}
                                    className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green md:p-0"
                                >
                                    ออกจากระบบ
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
