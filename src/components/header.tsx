import { Link } from "react-router-dom"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react";

const Header = () => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60 shadow-sm ">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <Link to={'/'}>
                    <img src={ theme === 'dark' ? '/logo1.png' : '/logo2.png'}
                    alt="logo" className="h-30" />
                </Link>

                <div>
                    {/*Search component will go here */ }
                    {/* Future feature: Theme toggle button */}
                    <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className={`flex items-center justify-center cursor-pointer transition-transform duration-500
                            ${isDark ? 'hover:rotate-180' : 'hover:-rotate-180'}`}
                        >
                        {isDark ? (
                            <Sun className="w-6 h-6 text-yellow-500 cursor-pointer" /> 
                        ): ( 
                            <Moon className="w-6 h-6 text-gray-800 cursor-pointer" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header