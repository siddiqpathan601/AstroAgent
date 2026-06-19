import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../lib/animations';
import ChatInterface from '../components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="h-full flex flex-col min-h-0 p-4 md:p-6">
      <div className="flex-1 min-h-0 glass-card rounded-2xl overflow-hidden">
        <ChatInterface />
      </div>
    </motion.div>
  );
}
