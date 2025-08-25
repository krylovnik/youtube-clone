import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {videos} from "@/db/schema";
import {db} from "@/db";
import {mux} from "@/lib/mux";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ctx}) => {
        const {id: userId} = ctx.user;

        const upload = await mux.video.uploads.create({
            cors_origin: "*",  // set to url in production
            new_asset_settings: {
                passthrough: userId,
                playback_policies: ["public"],
                video_quality: "basic",
                inputs: [
                    {
                        generated_subtitles: [
                            {
                                language_code: "en",
                                name: "English"
                            }
                        ]
                    }
                ]
            },

        });

        const [video] = await db
            .insert(videos)
            .values({
                userId,
                title: "Untitled",
                muxStatus: "waiting",
                muxUploadId: upload.id,
            })
            .returning();
        return {
            video: video,
            url: upload.url
        }
    })
})