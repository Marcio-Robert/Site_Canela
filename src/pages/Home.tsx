import React from 'react';
import { Hero } from '../components/Hero';
import { Biography } from '../components/Biography';
import { Proposals } from '../components/Proposals';
import { Projects } from '../components/Projects';
import { Agenda } from '../components/Agenda';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Biography />
      <Proposals />
      <Projects />
      <Agenda />
    </main>
  );
};
