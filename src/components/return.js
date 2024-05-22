import Link from 'next/link';
import Image from 'next/image';
import './return.css';

const Return = ({ text }) => (
    <Link href="/" className="flex items-center gap-2 p-2 h-[40px]">
        <Image src="/chevron-left.png" alt="back" width={24} height={24} />
        <span className="font-semibold return-style">{text}</span>
    </Link>
);
  
export default Return;
