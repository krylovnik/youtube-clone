import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";
import {db} from "@/db";
import {commentReactions} from "@/db/schema";
import {and, eq} from "drizzle-orm";

export const commentReactionsRouter = createTRPCRouter({
    like: protectedProcedure
        .input(z.object({commentId: z.uuid()}))
        .mutation(async ({input ,ctx}) => {
            const {commentId} = input;
            const {id: userId} = ctx.user;

            const [existingCommentReactionLike] = await db
                .select()
                .from(commentReactions)
                .where(
                    and(
                        eq(commentReactions.commentId, commentId),
                        eq(commentReactions.userId, userId),
                        eq(commentReactions.type, "like")
                    )
                )
            if (existingCommentReactionLike) {
                const [deletedCommentReaction] = await db
                    .delete(commentReactions)
                    .where(
                        and(
                            eq(commentReactions.commentId, commentId),
                            eq(commentReactions.userId, userId),
                        )
                    )
                    .returning();
                return deletedCommentReaction;
            }

            const [createdCommentReaction] = await db
                .insert(commentReactions)
                .values({userId, commentId, type: "like"})
                .onConflictDoUpdate({
                    target: [commentReactions.userId, commentReactions.commentId],
                    set: {
                        type: "like"
                    }
                })
                .returning();
            return createdCommentReaction
        }),
    dislike: protectedProcedure
        .input(z.object({commentId: z.uuid()}))
        .mutation(async ({input ,ctx}) => {
            const {commentId} = input;
            const {id: userId} = ctx.user;

            const [existingCommentReactionDislike] = await db
                .select()
                .from(commentReactions)
                .where(
                    and(
                        eq(commentReactions.commentId, commentId),
                        eq(commentReactions.userId, userId),
                        eq(commentReactions.type, "dislike")
                    )
                )
            if (existingCommentReactionDislike) {
                const [deletedCommentReaction] = await db
                    .delete(commentReactions)
                    .where(
                        and(
                            eq(commentReactions.commentId, commentId),
                            eq(commentReactions.userId, userId),
                        )
                    )
                    .returning();
                return deletedCommentReaction;
            }

            const [createdCommentReaction] = await db
                .insert(commentReactions)
                .values({userId, commentId, type: "dislike"})
                .onConflictDoUpdate({
                    target: [commentReactions.userId, commentReactions.commentId],
                    set: {
                        type: "dislike"
                    }
                })
                .returning();
            return createdCommentReaction
        })
 })