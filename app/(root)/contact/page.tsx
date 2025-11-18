"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translationContext";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { client } from "@/sanity/lib/client";

function Contact() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await client.fetch(`*[_type == "contactInfo"][0]`);
        setContactInfo(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await client.create({
        _type: "contact",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submittedAt: new Date().toISOString(),
        status: "new",
      });

      toast.success(t('messageSent'), {
        description: t('messageSentDesc'),
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-gold mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
    
         <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className={`w-12 h-12 text-zinc-600 dark:text-zinc-400 ${language === 'ar' ? 'ml-4' : 'mr-4'} `} />
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
              {t('contactTitle')}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                {t('getInTouch')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                {t('contactDescription')}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo?.address && (
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-zinc-600 dark:text-zinc-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">{t('address')}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              )}

              {contactInfo?.phone && (
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-zinc-600 dark:text-zinc-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">{t('phone')}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
              )}

              {contactInfo?.email && (
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-zinc-600 dark:text-zinc-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">{t('email')}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
              )}

              {contactInfo?.businessHours && (
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-zinc-600 dark:text-zinc-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">{t('businessHours')}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                      {contactInfo.businessHours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-white">
              {t('sendMessage')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  {t('contactName')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-800 text-black dark:text-white"
                  placeholder={t('enterContactName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  {t('contactEmail')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-800 text-black dark:text-white"
                  placeholder={t('enterContactEmail')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  {t('contactSubject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-800 text-black dark:text-white"
                  placeholder={t('enterContactSubject')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  {t('contactMessage')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-800 text-black dark:text-white resize-none"
                  placeholder={t('enterContactMessage')}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? t('submitting') : t('sendMessageBtn')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;