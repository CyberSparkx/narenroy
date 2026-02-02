import Link from "next/link";
import { FileText } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">N</span>
                    Naren Roy
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                    <a href="#experience" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Work</a>
                    <a href="#projects" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
                    <a href="#contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="/Naren Roy.pdf"
                        target="_blank"
                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                        <FileText size={16} />
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}
