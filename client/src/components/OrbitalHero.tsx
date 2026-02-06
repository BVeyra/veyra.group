import { motion } from 'framer-motion';
import { Mail, BarChart3, RefreshCw, FolderOpen, MessageSquare, Calendar } from 'lucide-react';

const orbitingIcons = [
  { icon: Mail, label: 'Email', color: 'text-[var(--emerald)]' },
  { icon: BarChart3, label: 'Reports', color: 'text-[var(--steel)]' },
  { icon: RefreshCw, label: 'Sync', color: 'text-[var(--emerald)]' },
  { icon: FolderOpen, label: 'Files', color: 'text-[var(--steel)]' },
  { icon: MessageSquare, label: 'Chat', color: 'text-[var(--emerald)]' },
  { icon: Calendar, label: 'Calendar', color: 'text-[var(--steel)]' },
];

function OrbitingIcon({ 
  icon: Icon, 
  index, 
  total, 
  orbitRadius, 
  duration,
  color 
}: { 
  icon: React.ElementType;
  index: number;
  total: number;
  orbitRadius: number;
  duration: number;
  color: string;
}) {
  const startAngle = (index / total) * 360;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      animate={{
        rotate: [startAngle, startAngle + 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        marginLeft: -orbitRadius,
        marginTop: -orbitRadius,
      }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [-startAngle, -startAngle - 360] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-[var(--emerald)]/10 hover:bg-white/10 transition-colors">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OrbitalHero() {
  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
      {/* Glow behind center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 bg-[var(--emerald)]/10 rounded-full blur-3xl" />
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <motion.div 
          className="absolute w-[380px] h-[380px] md:w-[450px] md:h-[450px] rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle ring */}
        <motion.div 
          className="absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <div className="absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border border-[var(--emerald)]/15" />
      </div>

      {/* Center stat */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-full w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            10+
          </motion.div>
          <motion.div 
            className="text-xs md:text-sm text-[var(--emerald)] mt-1 font-medium"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            hrs/week saved
          </motion.div>
        </motion.div>
      </div>

      {/* Orbiting icons - outer orbit */}
      {orbitingIcons.slice(0, 3).map((item, index) => (
        <OrbitingIcon
          key={item.label}
          icon={item.icon}
          index={index}
          total={3}
          orbitRadius={190}
          duration={35}
          color={item.color}
        />
      ))}

      {/* Orbiting icons - inner orbit */}
      {orbitingIcons.slice(3).map((item, index) => (
        <OrbitingIcon
          key={item.label}
          icon={item.icon}
          index={index}
          total={3}
          orbitRadius={130}
          duration={25}
          color={item.color}
        />
      ))}
    </div>
  );
}
