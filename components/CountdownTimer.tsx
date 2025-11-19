"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/translationContext";

interface CountdownTimerProps {
  endDate: string;
  className?: string;
}

export default function CountdownTimer({ endDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded px-1 py-0.5 min-w-[24px] text-center"
      >
        <motion.span
          className="text-sm font-bold text-white drop-shadow-lg"
          initial={{ y: -5 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </motion.div>
      <span className="text-[10px] text-white/90 mt-0.5 font-medium">{label}</span>
    </div>
  );

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className={`text-red-400 text-xs font-semibold drop-shadow-lg ${className}`}>
        {t('expired') || 'Expired'}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-white ${className}`}
    >
      <div className="text-[10px] font-semibold mb-1 text-center drop-shadow-lg">{t('endsIn') || 'Ends in'}</div>
      <div className="flex gap-1 items-center justify-center">
        <TimeUnit value={timeLeft.days} label={t('daysShort') || 'D'} />
        <span className="text-white/70 text-sm self-start mt-1">:</span>
        <TimeUnit value={timeLeft.hours} label={t('hoursShort') || 'H'} />
        <span className="text-white/70 text-sm self-start mt-1">:</span>
        <TimeUnit value={timeLeft.minutes} label={t('minutesShort') || 'M'} />
        <span className="text-white/70 text-sm self-start mt-1">:</span>
        <TimeUnit value={timeLeft.seconds} label={t('secondsShort') || 'S'} />
      </div>
    </motion.div>
  );
}