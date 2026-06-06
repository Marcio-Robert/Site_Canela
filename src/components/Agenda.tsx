import React from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgendaProps {
  data: Array<{
    id: number;
    date: string;
    time: string;
    title: string;
    location: string;
    status: string;
  }>;
}

export const Agenda: React.FC<AgendaProps> = ({ data }) => {
  return (
    <section className="py-12 bg-background border-t border-border overflow-hidden" id="agenda">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Agenda Pública
          </h2>
          <p className="text-foreground/70">
            Acompanhe nosso trabalho direto nas ruas e comunidades.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-8 pb-4">
          {data.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative pl-6 md:pl-8"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

              {/* Card Content */}
              <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-4 text-sm font-bold text-primary-dark bg-primary/5 w-max px-3 py-1.5 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-primary/30" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </div>
                  </div>
                  
                  {/* Status Tag */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full w-max ${
                    item.status === 'Confirmado' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status === 'Confirmado' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Loader2 className="w-3.5 h-3.5 animate-spin-slow" />}
                    {item.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-foreground mb-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
