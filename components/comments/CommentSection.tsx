'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { IoIosSend } from 'react-icons/io';
import { fadeInUp, staggerContainer, staggerItem } from './animation';
import { CommentEntry } from './interface';

const CommentsSection = () => {
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/comments');
        if (!response.ok) {
          throw new Error('Failed to load comments.');
        }
        const data: CommentEntry[] = await response.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setSubmitMessage('Error: Name and message cannot be empty.');
      setTimeout(() => setSubmitMessage(null), 3000);
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }
      const newComment: CommentEntry = await response.json();
      setComments(prevComments => [newComment, ...prevComments]);
      setName('');
      setMessage('');
      setSubmitMessage('Comment submitted successfully!');
      setTimeout(() => setSubmitMessage(null), 3000);
    } catch (err: any) {
      setSubmitMessage(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCommentList = () => {
    if (isLoading) return <p className="text-center text-gray-500 py-10">Loading comments...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
    if (comments.length === 0) return <p className="text-center text-gray-500 py-10">Be the first to leave a comment!</p>;
    
    return comments.map((comment) => (
      <motion.div 
        key={comment._id}
        className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-200"
        variants={staggerItem}
      >
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-zinc-300 rounded-full mr-3 flex items-center justify-center text-zinc-600 font-semibold">
            {comment.name.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-zinc-800 text-sm sm:text-base">{comment.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">{comment.message}</p>
      </motion.div>
    ));
  };


  return (
    <section id="comments" className="py-16 md:py-24 bg-[#fbfbfb]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 md:mb-16" initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Leave a Comment
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
            Share your thoughts, feedback, or just say hello!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-20 h-1 bg-zinc-800 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <motion.div 
            data-cursor-trail-ignore="true"
            className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl shadow-xl"
            initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmitComment} className="space-y-2">
              <div>
                <input
                  type="text" name="commenter-name" id="commenter-name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <textarea
                  name="comment-message" id="comment-message" rows={5} value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition-colors bg-zinc-50 focus:bg-white"
                  placeholder="Write your comment here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                  {!isSubmitting && <IoIosSend className="ml-2 w-5 h-5" />}
                </button>
              </div>
              {submitMessage && (
                <p className={`text-sm text-center font-medium ${submitMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>

          <motion.div 
            className="lg:col-span-7 flex flex-col"
            initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} transition={{delay: 0.2}}
          >
            <h3 className="text-2xl font-semibold text-zinc-800 mb-6 border-b pb-3 flex-shrink-0">
              {isLoading ? '...' : comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </h3>
            <div data-cursor-trail-ignore="true" className="flex-grow overflow-y-auto custom-scrollbar space-y-6 pr-2 max-h-[70vh] sm:max-h-[500px]">
              {renderCommentList()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;