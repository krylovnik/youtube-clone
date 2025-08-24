import MuxUploader from "@mux/mux-uploader-react";

interface StudioUploader {
    endpoint? : string | null;
    onSuccess: () => void;
}

export const StudioUploader= ({endpoint, onSuccess}:StudioUploader) => {
    return (
        <div>
            <MuxUploader endpoint={endpoint} onSuccess={onSuccess} />
        </div>
    )
}