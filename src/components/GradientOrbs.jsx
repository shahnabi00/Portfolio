import { motion } from 'framer-motion'

const GradientOrbs = () => {
  const orbs = [
    {
      color: 'from-violet-600 to-indigo-600',
      size: 'w-[600px] h-[600px]',
      position: 'top-[-200px] left-[-200px]',
      animation: { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] },
      duration: 20,
    },
    {
      color: 'from-cyan-500 to-blue-500',
      size: 'w-[500px] h-[500px]',
      position: 'bottom-[-150px] right-[-150px]',
      animation: { x: [0, -80, 0], y: [0, -60, 0], scale: [1.1, 1, 1.1] },
      duration: 25,
    },
    {
      color: 'from-fuchsia-500 to-pink-500',
      size: 'w-[400px] h-[400px]',
      position: 'top-[40%] left-[60%]',
      animation: { x: [0, 50, 0], y: [0, -40, 0], rotate: [0, 180, 360] },
      duration: 30,
    },
    {
      color: 'from-emerald-500 to-teal-500',
      size: 'w-[350px] h-[350px]',
      position: 'bottom-[20%] left-[20%]',
      animation: { x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.2, 1] },
      duration: 22,
    },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90" />
      
      {/* Animated Orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} rounded-full bg-gradient-to-r ${orb.color} opacity-30 blur-[120px]`}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial Gradient Center */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/50" />
    </div>
  )
}

export default GradientOrbs
