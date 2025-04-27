"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface CopyToClipboardProps {
    text: string
    children: React.ReactNode
    className?: string
}

export default function CopyToClipboard({ text, children, className }: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            toast.success("Text copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
            toast.error("Failed to copy text to clipboard")
        }
    }

    return (
        <div className={`group relative inline-block ${className}`}>
            {children}
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={copyToClipboard}
                aria-label="Copy to clipboard"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    )
}
