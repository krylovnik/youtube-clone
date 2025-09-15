import {Sidebar, SidebarContent} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {PersonalSection} from "@/modules/home/ui/components/home-sidebar/personal-section";
import {MainSection} from "@/modules/home/ui/components/home-sidebar/main-section";
import {SignedIn} from "@clerk/nextjs";
import {SubscriptionsSection} from "@/modules/home/ui/components/home-sidebar/subscriptions-section";

export const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible={"icon"}>
            <SidebarContent className="bg-background">
                <MainSection />
                <Separator/>
                <PersonalSection />
                <SignedIn>
                    <Separator/>
                    <SubscriptionsSection/>
                </SignedIn>
            </SidebarContent>
        </Sidebar>
    )
}