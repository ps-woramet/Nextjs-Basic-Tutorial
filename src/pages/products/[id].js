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