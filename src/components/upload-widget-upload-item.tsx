import * as Progress from "@radix-ui/react-progress";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import type { Upload } from "../store/uploads";

interface UploadWidgetUploadItemProps {
    upload: Upload
}

export function UploadWidgetUploadItem({ upload} : UploadWidgetUploadItemProps ) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const isUploadCompleted = upload.progress >= 100;

    useEffect(() => {
        const objectUrl = URL.createObjectURL(upload.file);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [upload.file]);

    function handleDownload() {
      if (!previewUrl) {
        return;
      }

      const link = document.createElement("a");
      link.href = previewUrl;
      link.download = upload.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    async function handleCopyLink() {
      if (!previewUrl) {
        return;
      }

      try {
        await navigator.clipboard.writeText(previewUrl);
      } catch {
        const textArea = document.createElement("textarea");
        textArea.value = previewUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setIsLinkCopied(true);
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 1500);
    }

    return (
        <motion.div 
        initial={{opacity: 0,}}
        animate={{opacity: 1,}}
        transition={{ duration: 0.6 }}
        className="p-3 rounded-lg flex flex-col shadow-shape-content bg-white/2 relative overflow-hidden">
           <div className="flex flex-col gap-1">
            <span className="text-xs font-medium flex items-center gap-1">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={upload.name}
                    className="size-4 rounded object-cover"
                  />
                ) : (
                  <ImageUp className="size-3 text-zinc-300 " strokeWidth={1.5} />
                )}
                <span>{upload.name}</span>
            </span>

            <span className="text-[0.625rem] text-zinc-400 flex gap-1.5 items-center ">  
                <span className="line-through">{upload.file.size}</span>
                <div className="size-1 rounded-full bg-zinc-700"/>
                <span>
                    300 KB
                    <span className="text-green-400 ml-1">
                      -94%
                    </span>
                </span>
                 <div className="size-1 rounded-full bg-zinc-700"/>
                  <span>{upload.progress}%</span>
            </span>
           </div>

           <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
                 <Progress.Indicator className="bg-indigo-700 h-1" style={{ width: `${upload.progress}%` }} />
           </Progress.Root>


           <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
             {isUploadCompleted ? (
                <>
                  <Button size="icon-sm" onClick={handleDownload} disabled={!previewUrl}>
                    <Download className="size-4 text-zinc-300" strokeWidth={1.5}/>
                    <span className="sr-only">Download file</span>
                  </Button>

                  <Button size="icon-sm" onClick={handleCopyLink} disabled={!previewUrl}>
                    <Link2 className="size-4 text-zinc-300" strokeWidth={1.5}/>
                    <span className="sr-only">{isLinkCopied ? "Link copied" : "Copy file URL"}</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="icon-sm">
                    <RefreshCcw className="size-4 text-zinc-300" strokeWidth={1.5}/>
                    <span className="sr-only">Retry upload</span>
                  </Button>

                  <Button size="icon-sm">
                    <X className="size-4 text-zinc-300" strokeWidth={1.5}/>
                    <span className="sr-only">Cancel upload</span>
                  </Button>
                </>
              )}
           </div>
        </motion.div>

    )
}
