# 🎉 Special Events System - Testing Guide

## Overview
The Special Events system allows you to create dynamic, themed popups for holidays, sales, and special promotions like Black Friday. The system is fully integrated with Sanity CMS and supports multi-language content.

## 🚀 Quick Start - Create Sample Event

### Option 1: Use the Script (Recommended)
```bash
# Make sure you have SANITY_AUTH_TOKEN set in your .env file
npm run create-sample-event
```

### Option 2: Manual Creation in Sanity Studio
1. Open your Sanity Studio: `npm run sanity dev`
2. Navigate to: **🏠 Homepage & Marketing → 🎉 Special Events**
3. Click **"Create new special event"**
4. Fill in the details using the sample data below

## 📋 Sample Black Friday Event Data

### Basic Information
- **Event Name**: Black Friday Sale
- **Event Type**: Holiday Sale (Black Friday, Christmas, etc.)
- **Status**: Active
- **Priority**: 10 (higher numbers show first)

### Timing
- **Start Date**: 2024-11-29 (or current date for testing)
- **End Date**: 2024-12-02 (or future date)
- **Popup Delay**: 10 seconds
- **Scroll Trigger**: 300px

### Content (English)
- **Headline**: BLACK FRIDAY MADNESS!
- **Description**: Massive savings on all products! Up to 70% off everything. Don't miss out on the biggest sale of the year!

### Theme Colors
- **Primary**: #DC2626 (Red)
- **Secondary**: #F59E0B (Amber)
- **Background**: #000000 (Black)

### Event Features
1. **Primary Feature**: Up to 70% Off (Tag icon)
2. **Primary Feature**: Free Shipping (Truck icon)
3. **Secondary Feature**: Double Points (Star icon)

### Call-to-Action
- **Primary CTA**: "Shop Black Friday Deals" → Navigate to `/collections/black-friday`
- **Secondary CTA**: "Maybe Later"

## 🌐 Multi-Language Support

The system supports English, French, and Arabic. For each text field, you can add:
- `fieldName_fr` for French
- `fieldName_ar` for Arabic

Example:
- `headline`: "BLACK FRIDAY MADNESS!"
- `headline_fr`: "FOU DU BLACK FRIDAY!"
- `headline_ar`: "جنون الجمعة السوداء!"

## 🎨 Event Types Available

- **Holiday Sale**: Black Friday, Christmas, New Year
- **Seasonal Promotion**: Spring, Summer, Fall, Winter
- **Flash Sale**: Limited time offers
- **Anniversary Sale**: Store anniversary events

## ⚙️ Configuration Options

### Timing Controls
- **Popup Delay**: Seconds to wait before showing popup
- **Scroll Trigger**: Pixels scrolled before showing popup
- **Max Displays**: How many times to show per user session

### Visual Customization
- **Theme Colors**: Primary, secondary, and background colors
- **Hero Image**: Optional background image
- **Background Pattern**: Additional visual effects

### Content Features
- **Event Features**: Up to multiple features with icons
- **Primary/Secondary**: Control which features are highlighted
- **Feature Icons**: Tag, gift, star, truck, trophy, fire, clock

## 🧪 Testing the Popup

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Create/Update Event in Sanity
- Ensure the event is **Active**
- Set **Start Date** to today or past
- Set **End Date** to future
- Set **Popup Delay** to 5-10 seconds for testing

### 3. Test the Popup Behavior
1. **Refresh the page** - popup should appear after delay
2. **Scroll down** - popup should appear after scroll trigger
3. **Close popup** - should not show again in same session
4. **Change browser tab** - popup should show again (new session)

### 4. Test Different Languages
- Change language in your app
- Verify popup content updates accordingly

### 5. Test Conditional Rendering
- Set event to **Inactive** - popup should not appear
- Set **End Date** to past - popup should not appear
- Delete event - popup should not appear

## 🔧 Troubleshooting

### Popup Not Showing
1. Check browser console for errors
2. Verify event is **Active** in Sanity
3. Check date range (Start ≤ Now < End)
4. Clear browser session storage: `sessionStorage.clear()`

### API Errors
1. Check `/api/special-events` endpoint
2. Verify Sanity connection
3. Check GROQ query syntax

### Styling Issues
1. Verify theme colors are set correctly
2. Check for CSS conflicts
3. Test on different screen sizes

## 📱 Features Demonstrated

✅ **Dynamic Theming** - Red/black Black Friday colors
✅ **Countdown Timer** - Shows time remaining
✅ **Multi-language** - English/French/Arabic support
✅ **Feature Highlights** - 70% off, free shipping, bonus points
✅ **Responsive Design** - Works on all devices
✅ **Session Management** - Shows once per session
✅ **Priority System** - Handles multiple events
✅ **Conditional Rendering** - Only shows when active

## 🎯 Production Deployment

1. **Create events** in Sanity Studio for your campaigns
2. **Test thoroughly** with different scenarios
3. **Set appropriate dates** for your promotions
4. **Configure timing** based on user behavior
5. **Monitor performance** and user engagement

The Special Events system is now ready for Black Friday and all your holiday promotions! 🎉