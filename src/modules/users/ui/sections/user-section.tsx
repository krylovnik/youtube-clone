"use client"

import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {trpc} from "@/trpc/client";
import {UserPageInfo} from "@/modules/users/ui/components/user-page-info";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";

interface UserSectionProps {
    userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
    return (
        <Suspense fallback={<UserSectionSkeleton/>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <UserSectionSuspense userId={userId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const UserSectionSkeleton = () => {
    return (
        <div className="py-6">
            <div className="flex flex-col md:hidden">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-[60px] w-[60px] rounded-full"/>
                    <div className="flex-1 min-w-0">
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="h-4 w-48 mt-1"/>
                    </div>
                </div>
                <Skeleton className="h-10 w-full mt-3 rounded-full"/>
            </div>

            <div className="hidden md:flex items-start gap-4">
                <Skeleton className="h-[160px] w-[160px] rounded-full"/>
                <div className="flex-1 min-w-0">
                    <Skeleton className="h-6 w-64"/>
                    <Skeleton className="h-5 w-48 mt-4"/>
                    <Skeleton className="h-10 w-32 mt-3 rounded-full"/>
                </div>
            </div>
        </div>
    )
}

const UserSectionSuspense = ({ userId }: UserSectionProps) => {
    const [user] = trpc.users.getOne.useSuspenseQuery({id: userId})
    return (
        <div className="flex flex-col">
            <UserPageInfo user={user}/>
            <Separator/>
        </div>
    )
}