"use client"


import { type CarouselApi } from "@/components/ui/carousel"
import {
    Carousel,
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect: (value: string | null) => void;
    data: {
        value: string;
        label: string;
    }[];
}

export const FilterCarousel = ({value, onSelect, data, isLoading}: FilterCarouselProps) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])


    return (
        <div className="relative w-full">
            {/* left fade */}

            <div className={cn(
                "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
                current === 1 && "hidden"
            )}/>

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    dragFree: true,
                }} className="w-full px-12">
                <CarouselContent className="-ml-3">
                    {!isLoading && (
                        <CarouselItem onClick={()=> onSelect(null)}
                            className="pl-3 basis-auto">
                            <Badge variant={!value ? "default" : "secondary"}
                                   className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm">
                                All
                            </Badge>
                        </CarouselItem>
                    )}
                    {isLoading && Array.from({length: 14}).map((_, index) => (
                        <CarouselItem key={index} className="pl-3 basis-auto">
                            <Skeleton className="rounded-largge px-3 py-1 h-full text-sm w-[100px] font-semibold">
                                &nbsp;
                            </Skeleton>
                        </CarouselItem>
                    ))}
                    {!isLoading && data.map((item) => (
                        <CarouselItem key={item.value} className="pl-3 basis-auto"
                                      onClick={()=> onSelect(item.value)}>
                            <Badge variant={value === item.value ? "default" : "secondary"}
                                   className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm">
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 z-20"/>
                <CarouselNext className="right-0 z-20"/>
            </Carousel>

            {/* right fade */}
            <div className={cn(
                "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none",
                current === count && "hidden"
            )}/>
        </div>
    )
}