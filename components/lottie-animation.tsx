"use client"
import { Player } from "@lottiefiles/react-lottie-player"

interface LottieAnimationProps {
  animationPath: string
  height?: number
  width?: number
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieAnimation({
  animationPath,
  height = 300,
  width = 300,
  loop = true,
  autoplay = true,
  className = "",
}: LottieAnimationProps) {
  return (
    <div className={className}>
      <Player
        autoplay={autoplay}
        loop={loop}
        src="https://assets5.lottiefiles.com/packages/lf20_ystsffqy.json"
        style={{ height: height, width: width }}
      />
    </div>
  )
}
