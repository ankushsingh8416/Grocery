import Image from 'next/image'
import CategoryList from "./_components/CategoryList"
import Products from "./_components/Products"
import Slider from "./_components/Slider"
import GlobalApi from "./_utils/GlobalApi"
import Footer from './_components/Footer'
export default async function Home() {
  const sliderList = await GlobalApi.getSliders()
  const CategoryLists = await GlobalApi.getCategoryList()
  const ProductList = await GlobalApi.getProducts()

  return (
    <div className="p-5 md:p-10 px-5 md:px-16">

      <Slider sliderList={sliderList} />
      <CategoryList CategoryLists={CategoryLists} />
      <Products ProductList={ProductList}/>
      {/* banner */}
      <Image src="/banner.png" width={1000} height={300} className='w-full md:h-[400px] object-contain ' alt='banner' />
      <Footer />
    </div>
  )
}

