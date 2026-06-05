import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldAlert } from 'lucide-react';

type Tab = 'colaboracao' | 'ouvidoria';

export const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('colaboracao');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    console.log('Form data to webhook:', data);
    // TODO: Connect to n8n webhook
    await new Promise(r => setTimeout(r, 1000));
    alert('Mensagem enviada com sucesso! O Vereador Canela agradece.');
  };

  return (
    <section className="py-16 bg-surface border-t border-border" id="contato">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Gabinete Aberto
          </h2>
          <p className="text-foreground/70">Onde o povo tem voz ativa todos os dias.</p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-black/5 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab('colaboracao')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'colaboracao' ? 'bg-white shadow-sm text-primary' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Colaboração
          </button>
          <button
            onClick={() => setActiveTab('ouvidoria')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'ouvidoria' ? 'bg-white shadow-sm text-red-600' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Ouvidoria / Denúncia
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-background rounded-3xl p-6 md:p-8 shadow-sm border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'colaboracao' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'colaboracao' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'colaboracao' ? (
                <div>
                  <h3 className="text-2xl font-bold mb-2">Construa o Piauí com o Canela</h3>
                  <p className="text-foreground/80 mb-6">Tem alguma ideia para melhorar seu bairro ou cidade? Mande sua sugestão. Aqui o povo tem voz ativa.</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input 
                      label="Nome Completo" 
                      placeholder="João da Silva"
                      {...register('nome', { required: 'Nome é obrigatório' })}
                      error={errors.nome?.message as string}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                        label="WhatsApp" 
                        placeholder="(00) 00000-0000"
                        {...register('whatsapp', { required: 'WhatsApp é obrigatório' })}
                        error={errors.whatsapp?.message as string}
                      />
                      <Input 
                        label="Bairro / Cidade" 
                        placeholder="Ex: Centro, Bom Jesus"
                        {...register('local', { required: 'Local é obrigatório' })}
                        error={errors.local?.message as string}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground/80">Sua Sugestão de Projeto</label>
                      <textarea 
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base shadow-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none h-32"
                        placeholder="Escreva sua ideia aqui..."
                        {...register('mensagem', { required: 'A mensagem é obrigatória' })}
                      />
                      {errors.mensagem && <span className="text-sm text-red-500">{errors.mensagem.message as string}</span>}
                    </div>
                    <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isSubmitting}>
                      Enviar Sugestão
                    </Button>
                  </form>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-red-600">Fale a Verdade</h3>
                  <p className="text-foreground/80 mb-6">Viu algo errado? Tem alguma denúncia ou reclamação sobre a nossa região? Pode falar. Você pode enviar de forma 100% anônima.</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <label className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-600"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <span className="font-medium text-red-900">Quero enviar anonimamente</span>
                    </label>

                    <AnimatePresence>
                      {!isAnonymous && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          <Input 
                            label="Nome (Opcional se anônimo)" 
                            placeholder="Seu nome"
                            {...register('nomeOuvidoria')}
                          />
                          <Input 
                            label="Telefone (Opcional)" 
                            placeholder="(00) 00000-0000"
                            {...register('telefoneOuvidoria')}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-1.5 pt-2">
                      <label className="text-sm font-medium text-foreground/80">O que está acontecendo?</label>
                      <textarea 
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none h-40"
                        placeholder="Detalhe a situação..."
                        {...register('denuncia', { required: 'Por favor, descreva a situação.' })}
                      />
                      {errors.denuncia && <span className="text-sm text-red-500">{errors.denuncia.message as string}</span>}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-95 transition-all focus:ring-red-500" 
                      isLoading={isSubmitting}
                    >
                      Enviar Relato Confidencial
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
