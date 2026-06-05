import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Send } from 'lucide-react';

export const Mobilize: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    console.log('Webhook Mobilization:', data);
    await new Promise(r => setTimeout(r, 1000));
    alert('Cadastro realizado! Em breve nossa equipe entrará em contato.');
  };

  return (
    <section className="relative py-20 bg-secondary overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          <div className="flex-1 text-white text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              Seja um multiplicador do nosso trabalho!
            </h2>
            <p className="text-white/90 text-lg">
              A verdadeira política se faz com a força da comunidade. Cadastre-se, receba nossos materiais no WhatsApp e ajude a levar a mensagem do Vereador Canela para a sua região.
            </p>
          </div>

          <div className="w-full md:w-[400px]">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                Junte-se ao Movimento
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input 
                  placeholder="Seu nome"
                  {...register('nome', { required: 'Nome é obrigatório' })}
                  error={errors.nome?.message as string}
                />
                <Input 
                  placeholder="WhatsApp (com DDD)"
                  type="tel"
                  {...register('whatsapp', { required: 'WhatsApp é obrigatório' })}
                  error={errors.whatsapp?.message as string}
                />
                
                <div className="flex flex-col gap-1.5">
                  <select 
                    className="flex h-14 w-full rounded-xl border border-border bg-surface px-4 py-2 text-base shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    {...register('regiao', { required: 'Selecione uma região' })}
                  >
                    <option value="">Selecione sua Região</option>
                    <option value="bom_jesus_centro">Bom Jesus (Centro)</option>
                    <option value="bom_jesus_bairros">Bom Jesus (Bairros)</option>
                    <option value="zona_rural">Zona Rural</option>
                    <option value="outra_cidade">Outra Cidade (Sul do PI)</option>
                  </select>
                  {errors.regiao && <span className="text-sm text-red-500">{errors.regiao.message as string}</span>}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark mt-2" isLoading={isSubmitting}>
                  Quero Fazer Parte
                  <Send className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-foreground/50 mt-4">
                  Seus dados estão seguros. Você receberá apenas mensagens da campanha oficial.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
