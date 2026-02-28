import { UploadCloud } from "lucide-react";
import { useUploads } from "../store/uploads";

export function UploadWidgetTitle() {
  const { uploads } = useUploads();
  const isThereAnyPendingUpload = uploads.size > 0;

    return (

        <div className="flex items-center gap-1.5 font-medium">
         <UploadCloud strokeWidth={1.5} className="size-4 text-zinc-400" />
         {isThereAnyPendingUpload ? (
        <span className="flex items-center gap-1">Uploads</span>
         ) : (
         <span className="text-sm font-medium">Faça upload dos seus arquivos</span>
         )}
        </div>

    )

}
        