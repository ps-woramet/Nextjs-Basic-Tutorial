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
