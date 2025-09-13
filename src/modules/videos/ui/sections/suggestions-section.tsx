"use client"

import {trpc} from "@/trpc/client";
import {DEFAULT_LIMIT} from "@/constants";
import {VideoRowCard, VideoRowCardSkeleton} from "@/modules/videos/ui/components/video-row-card";
import {VideoGridCard, VideoGridCardSkeleton} from "@/modules/videos/ui/components/video-grid-card";
import {InfiniteScroll} from "@/components/infinite-scroll";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";

interface SuggestionsSectionProps {
    videoId: string;
    isManual?: boolean;
}

export const SuggestionsSection = ({videoId, isManual}: SuggestionsSectionProps) => {
    return (
        <Suspense fallback={<SuggestionsSectionSkeleton/>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <SuggestionsSectionSuspense videoId={videoId} isManual={isManual}/>
            </ErrorBoundary>
        </Suspense>
    )
}

const SuggestionsSectionSkeleton = () => {
    return (
        <>
            <div className="hiddeen md:block space-y-3">
                {Array.from({length:8}).map((_, i) => (
                    <VideoRowCardSkeleton key={i} size="compact" />
                ))}
            </div>
            <div className="block md:hidden space-y-10">
                {Array.from({length:8}).map((_, i) => (
                    <VideoGridCardSkeleton key={i} />
                ))}
            </div>
        </>
    )
}

export const SuggestionsSectionSuspense = ({videoId, isManual}: SuggestionsSectionProps) => {
    const [suggestions, query] = trpc.suggestions.getMany.useSuspenseInfiniteQuery({
            videoId: videoId,
            limit: DEFAULT_LIMIT
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor
        })


    return (
        <>
            <div className="hidden md:block space-y-3">
                {suggestions.pages.flatMap((page) => page.items.map((video) => (
                    <VideoRowCard
                        key={video.id}
                        data={video}
                        size="compact"
                    />
                )))}
            </div>
            <div className="block md:hidden space-y-10">
                {suggestions.pages.flatMap((page) => page.items.map((video) => (
                    <VideoGridCard
                        key={video.id}
                        data={video}
                    />
                )))}
            </div>
            <InfiniteScroll
                isManual={isManual}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </>

    )

}