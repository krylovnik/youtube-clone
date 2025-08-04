"use client"

import {SignInButton, SignedIn, SignedOut, UserButton,} from '@clerk/nextjs'
import {Button} from "@/components/ui/button";
import {UserCircleIcon} from "lucide-react";

export const AuthButton = () => {
    return (
        <>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <Button
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 rounded-full border-blue-500/20 shadow-none "
                    >
                        <UserCircleIcon />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>

        </>

    )
};
