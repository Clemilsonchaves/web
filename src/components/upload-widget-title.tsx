import { UploadCloud } from "lucide-react";

export function UploadWidgetTitle() {   
   const isThereAnyPendingUpload = true;  
   const uploadGlobalpercentage = 66;

    return (

        <div className="flex items-center gap-1.5 font-medium">
         <UploadCloud strokeWidth={1.5} className="size-4 text-zinc-400" />
         {isThereAnyPendingUpload ? (
            <span className="flex items-center gap-1">
              Enviando
              <span className="text-xs text-zinc-400 tabular-nums">{uploadGlobalpercentage}%</span>
            </span>
         ) : (
         <span className="text-sm font-medium">Faça upload dos seus arquivos</span>
         )}
        </div>

    )

}
        