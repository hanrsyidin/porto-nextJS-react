// app/components/SubscribeModal.tsx
// ... (import dan kode lainnya tetap sama) ...
'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, FormEvent } from 'react';
import { IoIosSend, IoMdMail } from 'react-icons/io';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika respons tidak OK, lempar error dengan pesan dari API
        throw new Error(result.error || 'Something went wrong.');
      }
      
      // Jika berhasil
      setSubmitMessage({ type: 'success', text: 'Thank you for subscribing!' });
      setIsSubmitting(false);

      setTimeout(() => {
        setEmail('');
        onClose();
        setTimeout(() => setSubmitMessage({ type: '', text: '' }), 500); // Reset pesan setelah modal tertutup
      }, 2000);

    } catch (error: any) {
      // Tangkap error dan tampilkan pesannya
      setSubmitMessage({ type: 'error', text: error.message });
      setIsSubmitting(false);
    }
  };

  // Fungsi untuk menutup modal dan mereset state pesan
  const handleClose = () => {
    setSubmitMessage({ type: '', text: '' });
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose} data-cursor-trail-ignore="true">
        {/* ... (Backdrop dan panel modal tetap sama seperti sebelumnya) ... */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <Dialog.Title as="h3" className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <IoMdMail className="text-zinc-700"/>
              Join My Newsletter
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-600">
              Get updates when I publish new projects, articles, or share insights about technology and development. No spam, ever.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-4">
              <div>
                <label htmlFor="subscribe-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="subscribe-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                {!isSubmitting && <IoIosSend className="ml-2 w-5 h-5" />}
              </button>
            </form>

            {submitMessage.text && (
              <p className={`mt-4 text-sm text-center font-medium ${
                submitMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {submitMessage.text}
              </p>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}