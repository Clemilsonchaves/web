import { create } from 'zustand'

export type Upload = {
    name: string
    file: File
    progress: number
}

type UploadState = {
    uploads: Map<string, Upload>
    addUploads: (files: File[]) => void
}

export const useUploads = create<UploadState>((set) => {
    function updateUpload(uploadId: string, updater: (upload: Upload) => Upload) {
        set(state => {
            const currentUpload = state.uploads.get(uploadId);

            if (!currentUpload) {
                return state;
            }

            const uploads = new Map(state.uploads);
            uploads.set(uploadId, updater(currentUpload));

            return { uploads };
        })
    }

    function simulateUploadProgress(uploadId: string) {
        const intervalId = setInterval(() => {
            let shouldStop = false;

            updateUpload(uploadId, (upload) => {
                const nextProgress = Math.min(upload.progress + Math.floor(Math.random() * 18) + 8, 100);

                if (nextProgress >= 100) {
                    shouldStop = true;
                }

                return {
                    ...upload,
                    progress: nextProgress,
                }
            })

            if (shouldStop) {
                clearInterval(intervalId);
            }
        }, 250)
    }

    function addUploads(files: File[]) {
        for (const file of files) {
            const uploadId = crypto.randomUUID();

            const upload: Upload = {
                name: file.name,
                file,
                progress: 0,
            }

            set(state => {
                const uploads = new Map(state.uploads);
                uploads.set(uploadId, upload);

                return { uploads }
            })

            simulateUploadProgress(uploadId);
        }
    }
    return {
        uploads: new Map(),
        addUploads,
    }

}) 
    