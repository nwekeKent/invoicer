import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedImage = motion(Image);

const Loader = () => {
	return (
		<motion.div className="home-loader">
			<AnimatedImage
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					scale: [1, 1.2, 1.2, 1, 1],
					rotate: [0, 0, 180, 180, 0],
				}}
				transition={{
					duration: 2,
					ease: "easeInOut",
					times: [0, 0.2, 0.5, 0.8, 1],
					repeat: Infinity,
					repeatDelay: 1,
				}}
				src={"/assets/svg/logo-rectangle.svg"}
				alt="app-logo"
				height={40}
				width={40}
			/>
		</motion.div>
	);
};

export default Loader;
