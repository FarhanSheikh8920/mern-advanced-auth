import React from 'react'
import { motion } from 'framer-motion';

const Loadingspinner = () => {
  return (
    <>
<div className='min-h-screen bg-gradient-to-br from-gray-500 via-green-300 to-emerald-900 flex items-center justify-center relative overflow-hidden'>

    <motion.div 

animate={{ rotate: 360 }}
transition={{ duration: 1, repeat:Infinity,ease:"linear" }}
className="w-16 h-16 border-4 border-t-4 border-green-200 rounded-full"
/>

    </div>
    </>
  )
}

export default Loadingspinner





