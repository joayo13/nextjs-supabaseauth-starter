import Link from 'next/link';

export function TMDBAttribution() {
    return (
        <div className="text-sm text-muted-foreground">
            Reelists uses the{' '}
            <Link
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
            >
                TMDB
            </Link>{' '}
            API but is not endorsed or certified by TMDB.
        </div>
    );
} 