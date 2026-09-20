import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, Loader2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1kOpRWzCJebmkkJCqW1a_giHqWyxpCyjc5SoVVQG8qlw/export?format=csv';

interface AgendaItem {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  status: string;
  description?: string;
  parsedDate: Date;
}

export const Agenda: React.FC = () => {
  const [events, setEvents] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData: AgendaItem[] = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            results.data.forEach((row: any, index: number) => {
              const dateStr = row['DATA']?.trim() || '';
              const timeStr = row['HORÁRIO']?.trim() || '';
              const title = row['TÍTULO']?.trim() || '';
              const location = row['LOCALIZAÇÃO']?.trim() || '';
              const status = row['STATUS']?.trim() || '';
              const description = row['DESCRIÇÃO (opcional)']?.trim() || '';

              if (!title) return;
              if (status === 'Concluído') return;

              let parsedDate = new Date();
              if (dateStr) {
                const [day, month, year] = dateStr.split('/');
                if (day && month && year) {
                  // Assuming current century if only 2 digits year provided
                  const fullYear = year.length === 2 ? `20${year}` : year;
                  parsedDate = new Date(Number(fullYear), Number(month) - 1, Number(day));
                }
              }

              if (status === 'Cancelado' && parsedDate < today) {
                return;
              }

              parsedData.push({
                id: `agenda-${index}`,
                date: dateStr,
                time: timeStr,
                title,
                location,
                status,
                description,
                parsedDate
              });
            });

            parsedData.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

            setEvents(parsedData.slice(0, 5));
            setLoading(false);
          },
          error: (err: any) => {
            console.error('Error parsing CSV', err);
            setLoading(false);
          }
        });
      } catch (err: any) {
        console.error('Error fetching CSV', err);
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-700';
      case 'Cancelado': return 'bg-red-100 text-red-700';
      case 'Previsto': return 'bg-blue-100 text-blue-700';
      case 'Em andamento': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Cancelado': return <XCircle className="w-3.5 h-3.5" />;
      default: return <Loader2 className="w-3.5 h-3.5 animate-spin-slow" />;
    }
  };

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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-foreground/60 font-semibold tracking-wide">Sincronizando agenda...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-foreground/60 border-2 border-dashed border-border rounded-2xl bg-surface/50">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
            Nenhum evento futuro programado no momento.
          </div>
        ) : (
          <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-8 pb-4">
            {events.map((item, index) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="relative pl-6 md:pl-8"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-background ${item.status === 'Cancelado' ? 'bg-red-500' : 'bg-primary'}`} />

                  {/* Card Content */}
                  <div className={`bg-surface rounded-2xl p-5 border transition-shadow ${item.status === 'Cancelado' ? 'border-red-100 opacity-80' : 'border-border hover:shadow-md'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className={`flex items-center gap-4 text-sm font-bold w-max px-3 py-1.5 rounded-lg ${item.status === 'Cancelado' ? 'text-red-700 bg-red-50' : 'text-primary-dark bg-primary/5'}`}>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </div>
                        <div className={`w-1 h-1 rounded-full ${item.status === 'Cancelado' ? 'bg-red-300' : 'bg-primary/30'}`} />
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                      </div>
                      
                      {/* Status Tag */}
                      <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full w-max ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold font-heading mb-2 ${item.status === 'Cancelado' ? 'text-foreground/70 line-through' : 'text-foreground'}`}>
                      {item.title}
                    </h3>
                    
                    <div className={`flex items-center gap-2 text-sm ${item.status === 'Cancelado' ? 'text-foreground/40' : 'text-foreground/60'}`}>
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    {item.description && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <button 
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors focus:outline-none"
                        >
                          {isExpanded ? (
                            <>Ocultar detalhes <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>Ver detalhes <ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="pt-3 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
