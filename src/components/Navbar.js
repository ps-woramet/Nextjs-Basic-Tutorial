import Image from 'next/image';
import Link from 'next/link'

const Navbar = () => {
    return (
    <nav className='flex items-center justify-between p-2 border-2 borderb-gray-600'>
        <div>
            <Link href="/"><Image src="/logo.png" width={50} height={50} alt='logo'/></Link>
        </div>
        <ul className='flex items-center justify-center gap-5'>
            <Link href="/">หน้าแรก</Link>
            <Link href="/about">เกี่ยวกับเรา</Link>
            <Link href="/products">สินค้าทั้งหมด</Link>
        </ul>
    </nav>);
}
 
export default Navbar;