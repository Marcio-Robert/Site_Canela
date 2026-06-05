import React from 'react';
import { Calendar, FileText, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  { icon: Calendar, value: '2+', label: 'Anos de Mandato' },
  { icon: FileText, value: '25+', label: 'Projetos e Indicações' },
  { icon: MapPin, value: '18+', label: 'Comunidades Atendidas' },
  { icon: Heart, value: '100%', label: 'Dedicação' },
];

export const Metrics: React.FC = () => {
  return (
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background border border-border shadow-sm text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm font-medium text-foreground/70">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
