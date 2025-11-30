import { useDropzone } from "react-dropzone"
import CircularProgressBar from "./ui/circular-progress-bar";

export function UploadWidgetDropzone() {
    const isThereAnyUpload = true
    const uploadGlobalPercentage = 66

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        }
    });
    return (
        <div  className="px-3 flex flex-col gap-3"  >
            <div
              data-active={isDragActive}
              className="cursor-pointer text-zinc-600 bg-black/20 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col justify-center items-center gap-1 hover:border-zinc-400 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500 data-[active=true]:text-indigo-400"
             {...getRootProps()} >
              <input {...getInputProps()} />   

              {isThereAnyUpload ? (

                <div className="flex flex-col items-center gap-2.5">
                  <CircularProgressBar progress={uploadGlobalPercentage} size={56} strokeWidth={4}/>
                  <span className="text-xs">Uploading 2 files...</span>
                </div>

              ) : (
                <>
                 <span className="text-xs">Drop your files here or</span>
                 <span className="text-xs underline"> click to open picker</span>
                </>
              )}
            </div>

            <span className="text-xs text-zinc-400">Only PNG and JPG files are allowed</span>
        </div>
    )
}