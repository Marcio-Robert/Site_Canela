import React from 'react';
import { Calendar, FileText, MapPin, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  FileText,
  MapPin,
  Heart
};

interface MetricsProps {
  data: Array<{
    iconName: string;
    value: string;
    label: string;
  }>;
}

export const Metrics: React.FC<MetricsProps> = ({ data }) => {
  return (
    <section className="py-8 bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((metric, index) => {
            const Icon = iconMap[metric.iconName] || Heart;
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
