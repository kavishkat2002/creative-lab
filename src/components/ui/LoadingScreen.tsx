import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
            <div className="w-[300px] h-[300px]">
                <DotLottieReact
                    src="https://lottie.host/f357343b-51e3-44b5-9329-330f4e5b609a/T1vYSTK7bj.lottie"
                    loop
                    autoplay
                />
            </div>
        </motion.div>
    );
}
