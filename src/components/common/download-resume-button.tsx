'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // ← correct import
import { Download, Loader2 } from 'lucide-react';

export const DownloadResumeButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/download');

            if (response.status === 429) {
                toast.error('Please wait a few seconds before trying again.');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to download resume.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'William_Astley_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success('Download started! Your resume is downloading.');
        } catch (error) {
            console.error(error);
            toast.error('Error downloading resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={isLoading}
            variant="default"
            className="flex items-center gap-2"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Downloading...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4" />
                    Download Resume
                </>
            )}
        </Button>
    );
};
