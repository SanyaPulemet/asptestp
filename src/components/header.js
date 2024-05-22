import Link from 'next/link';
import Image from 'next/image';
import './header.css';

const Header = () => (
 <header className="text-white w-full my-header">
   <div className="max-w-[1494px] mx-auto p-0 py-4 flex justify-between items-center">
     <div className="flex items-center">
       <Link href="/">
         <Image src="/logo.svg" alt="Logo" width={180} height={40} />
       </Link>
     </div>
     <nav className="flex space-x-2">
        <Link href="/">
          <button className="header-button font-semibold">Создать счёт</button>
        </Link>
        <Link href="/">
          <button className="header-button font-semibold">Корзина</button>
        </Link>
        <div className="flex items-center space-x-2">
            <Link href="/">
                <div className="avatar-container">
                 <img src="/avatar.png" alt="User Avatar" className="avatar" />
                 <img src="/dropdown-icon.png" alt="Dropdown Icon" className="dropdown-icon" />
                </div>
            </Link>
            <div className="burger-container">
                <Link href="/">
                 <img src="/burger.png" alt="Burger" className="burger-menu" />
                </Link>
            </div>  
        </div>
     </nav>
   </div>
 </header>
);

export default Header;