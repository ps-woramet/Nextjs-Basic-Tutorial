0. static route -> index.js
    dynamic route -> [id].js

    getStaticPaths กำหนด path ทั้งหมด (SSG for dynamic route)
    getStaticProps fetchData (SSG for static route and dynamic route)

    getServerSideProps fetchData (SSR)

1. install project

    npx create-next-app@latest
    What is your project named? nextjs-basic-tutorial
    Would you like to use TypeScript? No
    Would you like to use ESLint? No
    Would you like to use Tailwind CSS? Yes
    Would you like to use `src/` directory? Yes
    Would you like to use App Router? (recommended) No
    Would you like to customize the default import alias (@/*)? Yes
    What import alias would you like configured? @/*

2. โครงสรา้ง project

    pages
        สร้าง route ตามชื่อ file เช่น profile.js -> /profile ยกเว้น index.js

    styles
        เก็บ style css

    public
        เก็บ static file

    next.config.js
        ไฟล์สำหรับตั้งค่า project
    
    _app.js
        ไฟล์เพจหลักในการ run application โดยนำส่วนประกอบต่างๆมาประกอบกัน

3. create route

    /products -> create file (pages > products.js)

    -pages > products.js

        const Products = () => {
            return (<><div>my product</div></>);
        }
        
        export default Products;

4. สร้าง components

    src > components

        src > components > Navbar.js (นำรูปไว้ใน public)

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

        src > components > Footer.js

            const Footer = () => {
                return (<footer>
                    copyright 2024 | woramet tompudsa
                </footer>);
            }
            
            export default Footer;

5. สร้าง Layout component

    src > components

        src > components > Layout.js

            import Footer from "./Footer";
            import Navbar from "./Navbar";

            const Layout = () => {
                return (
                    <div>
                        <Navbar/>
                        <Footer/>
                    </div>
                );
            }
            
            export default Layout;

    นำไปใช้งาน

        src > pages > _app.js

            import '@/styles/globals.css'
            import Layout from '@/components/Layout'

            export default function App({ Component, pageProps }) {
            return (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )
            }

6. สร้าง css ให้แต่ละ route

    สร้าง file src > styles > Home.module.css

        .title{
            color: red;
        }
    
    นำไปใช้งาน

        src > pages > index.js

            import Image from 'next/image'
            import { Inter } from 'next/font/google'
            import style from '@/styles/Home.module.css'

            const inter = Inter({ subsets: ['latin'] })

            export default function Home() {
            return (
                <>
                <div className={style.title}>welcome</div>
                </>
            )
            }

7. การกำหนด title

    src > pages > index.js

        import Image from 'next/image'
        import { Inter } from 'next/font/google'
        import style from '@/styles/Home.module.css'
        import Head from 'next/head'

        const inter = Inter({ subsets: ['latin'] })

        export default function Home() {
        return (
            <>
            <Head>
                <title>
                Home page
                </title>
                <meta name='keyword' content='shopping shirt'/>
            </Head>
            <div className={style.title}>welcome</div>
            </>
        )
        }

8. ดึงข้อมูลจาก api ด้วย getStaticProps (SSG) และ config สำหรับรูป

    next.config.js

        /** @type {import('next').NextConfig} */
        const nextConfig = {
        reactStrictMode: true,
        images: {
            remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            },
            ],
        },
        }

        module.exports = nextConfig

    https://dummyjson.com/products?limit=10

    src > pages > index.js

        import Image from 'next/image'
        import { Inter } from 'next/font/google'
        import style from '@/styles/Home.module.css'
        import Head from 'next/head'
        import Link from 'next/link'

        const inter = Inter({ subsets: ['latin'] })

        export async function getStaticProps(){
        const res = await fetch("https://dummyjson.com/products?limit=10")
        const data = await res.json()
        console.log(data);
        return{
            props: {products:data.products}
        }
        }

        export default function Home({products}) {
        return (
            <>
            <Head>
                <title>
                Home page
                </title>
                <meta name='keyword' content='shopping shirt'/>
            </Head>
            <div className={style.title}>Welcome</div>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {products?.map(item=>
                    (<div key={item.id}>
                    <Link href={"/products/"+item.id}>
                        <h2 className='hover:text-red-500'>{item.title}</h2>
                        <Image className='object-fill h-48 w-96' src={item.thumbnail} width={300} height={300} alt={item.title}/>
                    </Link>
                    </div>))}
                </div>
            </div>
            </>
        )
        }

9. สร้าง dynamic route และใช้งาน getStaticPath(กำหนด path ที่เป็นไปได้) getStaticProps(เพื่อ fetch api)

    src > pages > products > [id].js

        import Image from 'next/image'
        // กำหนด path ทั้งหมด
        export async function getStaticPaths(){
            const res = await fetch("https://dummyjson.com/products?limit=10")
            const data = await res.json()
            // ทำให้อยู่ในรูป paths = [{params: {id:'1'}}, {params: {id:'2'}}]
            const paths = data.products.map((item) => {
                return{
                    params: {id: String(item.id)}
                }
            })
            return{
                paths,
                // แสดง 404 เมื่อไม่เจอ path
                fallback: false
            }
        }

        // fetch data
        export async function getStaticProps({params}){
            const id = params.id
            const res = await fetch("https://dummyjson.com/products/"+id)
            const data = await res.json()
            console.log(data);
            return{
            props: {product:data}
            }
        }

        const ProductDetail = ({product}) => {

            return (<>
                <div>รหัสสินค้า : {product.id}</div>
                <h1>ชื่อสินค้า : {product.title}</h1>
                <Image className='object-fill h-48 w-96' src={product.thumbnail} width={300} height={300} alt={product.title}/>
                <p>รายละเอียด : {product.description}</p>
                <p>ราคา : {product.price}</p>
            </>);
        }
        
        export default ProductDetail;
 
10. static html export

    หากต้องการ static file (ให้ทำการเพิ่ม output: 'export')

        -next.config.js เพิ่ม unoptimized:true เมื่อมีการใช้งานรูปภาพจากภายนอก

            /** @type {import('next').NextConfig} */
            const nextConfig = {
            reactStrictMode: true,
            output: 'export',
            images: {
                remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'cdn.dummyjson.com',
                },
                ],
                unoptimized:true
            },
            
            }

            module.exports = nextConfig


    ใช้คำสั่ง npm run build (เพื่อ build file) จะได้ folder out ออกมา

    ใช้คำสั่ง npx serve out (เพื่อใช้งาน web ที่ build ใน folder out)

    จากนั้นนำ folder out ไป deploy
    