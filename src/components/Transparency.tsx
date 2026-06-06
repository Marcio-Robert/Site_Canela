import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

interface TransparencyProps {
  data: {
    chartData: Array<{
      id: string;
      label: string;
      percentage: number;
      color: string;
    }>;
  };
}

export const Transparency: React.FC<TransparencyProps> = ({ data }) => {
  const size = 220;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  let currentOffset = 0;
  const segments = data.chartData.map(item => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += (item.percentage / 100) * circumference;
    return { ...item, strokeDasharray, strokeDashoffset };
  });

  return (
    <section className="py-12 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <PieChart className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Transparência e Prestação de Contas
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Acompanhe a destinação de recursos e emendas do nosso mandato. O dinheiro público tratado com respeito e clareza.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* Native SVG Donut Chart */}
          <div className="relative w-[220px] h-[220px]">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
              {segments.map((segment, index) => (
                <motion.circle
                  key={segment.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  whileInView={{ strokeDasharray: segment.strokeDasharray }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                  className="transition-all hover:opacity-80 cursor-pointer"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-heading font-black text-foreground">100%</span>
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Aplicado</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {data.chartData.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-foreground/90">{item.label}</span>
                </div>
                <span className="font-bold text-foreground">{item.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
