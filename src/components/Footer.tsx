import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#1ED760] text-gray-50 mx-auto mt-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              An application that provides users insights into their Spotify
              listening patterns.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">SPAZ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tracks"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Tracks
                </Link>
              </li>
              <li>
                <Link
                  href="/artistes"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Artistes
                </Link>
              </li>
              <li>
                <Link
                  href="/genres"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  href="/recents"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Recents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm hover:text-gray-600 transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SPAZ. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/medewaset"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
              >
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/timothy-medewase"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
              >
                <FaLinkedinIn className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/timothymedewase"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
              >
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
