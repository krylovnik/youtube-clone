import {VideoGetManyOutput} from "@/modules/videos/types";
import Link from "next/link";
import {VideoThumbnail} from "@/modules/videos/ui/components/video-thumbnail";
import {VideoInfo} from "@/modules/videos/ui/components/video-info";

interface VideoGridCardProps {
    data: VideoGetManyOutput["items"][number];
    onRemove?: () => void;
}

export const VideoGridCard = ({data,onRemove}: VideoGridCardProps) => {
    return (
        <div className="flex flex-col gap-2 w-full group">
            <Link href={`/videos/${data.id}`}>
                <VideoThumbnail
                    imageUrl={data.thumbnailUrl}
                    previewUrl={data.previewUrl}
                    title={data.title}
                    duration={data.duration ?? 0}
                />
            </Link>
            <VideoInfo data={data} onRemove={onRemove} />
        </div>
    )
}