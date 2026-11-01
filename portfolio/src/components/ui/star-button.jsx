import React from "react"
import { GithubIcon } from '@/components/SocialIcons'
import { Star } from 'lucide-react'

const StarButton = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-[24px] py-[10px] 
        text-[12px] md:text-[14px] font-mono uppercase tracking-widest
        text-black 
        bg-white 
        border-[2px] border-white 
        rounded-md 
        shadow-[0_0_0_rgba(255,255,255,0.5)] 
        transition-all duration-300 ease-in-out 
        cursor-pointer
        hover:bg-transparent hover:text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
        active:scale-95 flex items-center justify-center gap-2
        ${className || ''}
      `}
    >
      {children}

      {/* Star 1 */}
      <div className="absolute top-[20%] left-[20%] w-[25px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>

      {/* Star 2 */}
      <div className="absolute top-[45%] left-[45%] w-[15px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>

      {/* Star 3 */}
      <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>

      {/* Star 4 */}
      <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>

      {/* Star 5 */}
      <div className="absolute top-[25%] left-[45%] w-[15px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>

      {/* Star 6 */}
      <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(255,255,255,0.5)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:z-[2]">
        <Star className="w-full h-auto fill-white stroke-white" />
      </div>
    </button>
  )
}

export default StarButton
