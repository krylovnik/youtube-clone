"use client"

import { HistoryIcon, ListVideoIcon, ThumbsUpIcon} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {useAuth, useClerk} from "@clerk/nextjs"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {toast} from "sonner";

const items = [
    {
        title: "History",
        url: "/playlists/history",
        icon: HistoryIcon,
        auth: true
    },
    {
        title: "Liked videos",
        url: "/playlists/liked",
        icon: ThumbsUpIcon,
        auth: true
    },
];

export const PersonalSection = () => {
    const clerk = useClerk();
    const {isSignedIn} = useAuth();
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={pathname === item.url}
                                onClick={(e)=> {
                                    if (!isSignedIn && item.auth) {
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }}}
                            >
                            <Link prefetch href={item.url} className="flex items-center gap-4">
                                <item.icon/>
                                <span className="text-sm">{item.title}</span>
                            </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="All playlists"
                            asChild
                            isActive={pathname === "/playlists"}
                            onClick={(e)=> {
                                if (!isSignedIn) {
                                    e.preventDefault();
                                    return clerk.openSignIn();
                                }
                                toast.info("This function is in development. Try again later");
                            }}
                        >
                        <div className="flex items-center gap-4">
                            <ListVideoIcon/>
                            <span className="text-sm">All playlists</span>
                        </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}