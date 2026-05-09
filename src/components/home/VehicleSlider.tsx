
import { Bike, Bus, Car, ChevronLeft, ChevronRight, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react'
import { useState } from 'react';

const VEHICLE_CATEGORIES = [
  { title: 'Cars', description: 'Browse the full fleet..', Icon: Car, tag: "Premium" },
  { title: 'Bikes', description: 'Fast and affordable rides.', Icon: Bike, tag: "Premium" },
  { title: 'Vans', description: 'Comfortable city travel.', Icon: Bus, tag: "Family" },
  { title: 'Trucks', description: 'Find the perfect truck for your needs, whether it’s for work or play, with our selection of powerful and reliable trucks.', Icon: Truck, tag: "Cargo" },

];

const VehicleSlider = () => {

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className=' w-full h-[200vh] bg-white py-20 px-4 overflow-hidden'>
        <div className=' max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className=' flex items-end justify-between mb-10'
          >
            <div>
              <div className=' flex items-center gap-2 mb-3'>
                <div className=' h-px w-8 bg-zinc-900'>
                  <span className=' text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>Fleet</span>
                </div>
                <h2 className=' text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 loading-none'> Vehicles <br />
                  <span className=' relative inline-block'>Categories
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
                      <div className=' absolute -bottom-1 left-0 right-0 w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-75 animate-pulse'></div>

                    </motion.div>
                  </span>
                </h2>

                <p className="text-zinc-400 text-sm-mt-3 font-medium">Choose the ride that fits your journey</p>
              </div>

            </div>
            <div className=' hidden sm:flex items-center gap-2'>
              <motion.div
                whileTap={{ scale: 0.88 }}
                className=' w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-bs-zinc-900
                hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900
                disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.88 }}
                className=' w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-bs-zinc-900
                hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900
                disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* vihicle categories slider */}
          <div className=' relative'>
            <div className=' flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1'
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {
                VEHICLE_CATEGORIES.map((c, i) => {
                  const isHovered = hovered == i /// check if the current card is hovered
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // every card set the delay on different time to create a staggered effect
                      onHoverStart={() => setHovered(i)}
                      onHoverEnd={() => setHovered(null)}
                      whileHover={{ y: -8 }}
                      className=' group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer'
                    >

                      <motion.div
                        animate={{
                          backgroundColor: isHovered ? "#09090b" : "#ffffff",
                          borderColor: isHovered ? "#09090b" : "#e5e7eb",
                          boxShadow: isHovered ? "0 24px 56px rgba(0, 0, 0, 0.12)" : "0 1px 3px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 0.25, }}
                        className=' relative rounded-3xl border p-6 sm:p-7 overflow-hidden h-full'
                      >

                        {/* icon tag */}
                        <motion.div
                          animate={{
                            backgroundColor: isHovered ? "rgba(255,255,255,0.12)" : "#f4f4f5",
                            color: isHovered ? "#ffffff" : "#71717a",
                            borderColor: isHovered ? "rgba(255,255,255,0.15)" : "#e4e4e7",
                          }}
                          className="inline-flex items-center gap-1.5 border text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full mb-5 transition-colors"
                        >
                          <Sparkles size={8} />
                          {c.tag}
                        </motion.div>

                        {/* show the icon with a background circle */}
                        <motion.div
                          animate={{
                            backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "#f4f4f5",
                            borderColor: isHovered ? "rgba(255,255,255,0.15)" : "#e4e4e7",
                          }}
                          className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 transition-colors"
                        >
                          <motion.div
                            animate={{ color: isHovered ? "#ffffff" : "#3f3f46" }}
                            transition={{ duration: 0.2 }}
                          >
                            <c.Icon size={24} strokeWidth={1.4} />
                          </motion.div>
                        </motion.div>

                        {/* title and description */}
                        <motion.h3
                        animate={{ color: isHovered ? "#ffffff" : "#09090b" }}
                        transition={{ duration: 0.2 }}
                        className=' text-lg font-black tracking-tight loading-none mb-2 '
                        >
                          {c.title}
                        </motion.h3>

                        <motion.p
                          animate={{ color: isHovered ? "#d4d4d8" : "#52525b" }}
                          transition={{ duration: 0.2 }}
                          className=' text-base font-medium loading-none '
                        >
                          {c.description}
                        </motion.p>

                      </motion.div>

                    </motion.div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VehicleSlider