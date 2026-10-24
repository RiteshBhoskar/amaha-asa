"use client"
import { FaWhatsapp } from "react-icons/fa"
import { motion } from "motion/react"

export default function Navbar() {
    return (
        <motion.nav className="w-full h-full flex items-center justify-between px-4 py-2"
        animate={{ opacity: [0, 1], y: [-20, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        >
            <img src={"AmahaLogo.svg"} alt={"Amaha Logo"} />
            <div className="flex gap-10 border border-white rounded-full px-7 py-2">
                <button className="cursor-pointer">Experts</button>
                <button>Clinics</button>
                <button>Services</button>
                <button>Conditions</button>
            </div>
            <div className="flex gap-5 items-center">
                <FaWhatsapp
                className="cursor-pointer text-green-500 hover:text-white 
                            border border-white rounded-full p-1 
                            hover:bg-green-500 transition-all duration-300"
                            height={30} width={30} />
                <img src={"phone-enabled-sharp.svg"} alt={"phone"} className="cursor-pointer border border-white rounded-full p-1" width={30} height={30} />
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold cursor-pointer">
                 R    
                </div>
            </div>
        </motion.nav>
    )
}