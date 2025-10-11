import { Link } from "react-router-dom"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

const Header = () => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60 shadow-sm overflow-hidden">
            <div className="container mx-auto px-2 sm:px-4 flex h-16 items-center justify-between gap-2 min-w-0">
                <Link to={'/'} className="flex items-center flex-shrink min-w-0 max-w-[40%]">
                    <img src={ theme === 'dark' ? '/logo1.png' : '/logo2.png'}
                    alt="logo" className="h-30 max-h-full w-auto max-w-full object-contain" />
                </Link>

                <div className="flex gap-2 sm:gap-4 items-center flex-shrink-0 min-w-0">
                    {/*Search component will go here */ }
                    <div className="flex-shrink min-w-0">
                        <CitySearch />
                    </div>

                    <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className={`flex items-center justify-center cursor-pointer transition-transform duration-500 flex-shrink-0 w-10 h-10
                            ${isDark ? 'rotate-180' : 'rotate-0'}`}
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