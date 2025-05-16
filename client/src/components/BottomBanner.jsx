import { assets, features } from "../assets/assets"

const BottomBanner = () => {
    return (
        <div className="relative mt-24">
            {/* Desktop Image */}
            <img
                src={assets.bottom_final}
                alt="bottom banner"
                className="w-full hidden md:block object-cover max-h-[500px]"
                loading="lazy"
            />

            {/* Mobile Image with 90° rotation */}
            <div className="md:hidden w-full h-[600px] overflow-hidden flex justify-center items-center">
                <img
                    src={assets.bottom_final}
                    alt="bottom banner mobile"
                    className="rotate-270 h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-4">
                <div>
                    <h1 className="text-5xl md:text-5xl font-semibold text-green-800 mb-6">
                        Why We Are The Best?
                    </h1>

                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 mt-4">
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-9 md:w-11 mt-1"
                                loading="lazy"
                            />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-500/70 text-xs md:text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BottomBanner
