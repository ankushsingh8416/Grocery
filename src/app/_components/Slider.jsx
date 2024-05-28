import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const Slider = ({ sliderList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                slider.attributes?.image?.data[0]?.attributes?.url
              }
              width={1000}
              height={400}
              alt="slider"
              className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2" />
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2" />
    </Carousel>

 
  );
};

export default Slider;
