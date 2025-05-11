import { assets, features } from "../assets/assets"


const BottomBanner = () => {
    return (
        <div className="relative mt-24">
            <img src={assets.bottom_final} alt="bottom banner" className="w-full h-full hidden md:block max-h-[500px] overflow-hidden" />
            <img src={assets.bottom_final} alt="bottom banner mobile" className="w-full  md:hidden" />
            <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-3 md:mt-0 md:pr-24">
                <div className="">
                    <h1 className="text-4xl md:text-6xl font-semibold  mb-6 text-green-800">
                        Why We Are The Best?
                    </h1>
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 mt-2">
                            <img src={feature.icon} alt={feature.title} className="md:w-11 w-9 ml-15" />
                            <div className="">
                                <h3 className="text-lg md:text-4xl font-semibold ">{feature.title}</h3>
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