import Image from 'next/image';

export default function HeroIntro({ isDark }: { isDark: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
            <Image
                src={isDark ? "/loading-shop-dark.gif" : "/loading-shop.gif"}
                alt="shopping animation"
                width={192}
                height={192}
                className="w-48 h-48"
                unoptimized 
            />
            <h1 className="text-2xl md:text-3xl font-semibold">
                Your ultimate shopping experience is about to begin...
            </h1>
        </div>
    );
}
