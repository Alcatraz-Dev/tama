"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Instagram, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description?: string;
  url: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title,
    text: description || title,
    url: url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying:', error);
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct share URL, so we'll copy to clipboard
    handleCopyLink();
    alert('Link copied! You can now paste it in your Instagram story or post.');
  };

  return (
    <div className="flex flex-wrap gap-3">
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          variant="outline"
          size="lg"
          onClick={handleNativeShare}
          className="inline-flex items-center"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      )}

      <Button
        variant="outline"
        size="lg"
        onClick={shareToFacebook}
        className="inline-flex items-center"
      >
        <Facebook className="w-5 h-5 mr-2" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={shareToTwitter}
        className="inline-flex items-center"
      >
        <Twitter className="w-5 h-5 mr-2" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={shareToInstagram}
        className="inline-flex items-center"
      >
        <Instagram className="w-5 h-5 mr-2" />
        Instagram
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={handleCopyLink}
        className="inline-flex items-center"
      >
        {copied ? (
          <Check className="w-5 h-5 mr-2 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 mr-2" />
        )}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
}