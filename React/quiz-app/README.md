# 🎯 Quiz App with Timer - Complete Game Guide

A modern, interactive quiz application built with React and Vite featuring dual timers: 1-minute total timer and 20-second per-question timer with instant game-over functionality.

![Quiz App Demo](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Game Overview

This is a fast-paced quiz game that tests your knowledge under time pressure. You have **1 minute total** to answer **10 questions**, but each question has a **20-second limit**. If you don't answer within 20 seconds, the game ends immediately!

### 🏆 Key Features

- ⏱️ **Dual Timer System**: 1-minute total + 20-second per-question timer
- 🚫 **Game Over on Timeout**: Quiz ends immediately if no answer within 20 seconds
- 🎨 **Interactive Interface**: Multiple-choice questions with instant feedback
- ✅ **Visual Feedback**: Green for correct, red for wrong answers
- 📊 **Score Tracking**: Real-time score calculation
- 🏆 **Results Screen**: Performance analysis with retry options
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ✨ **Smooth Animations**: Professional transitions and effects

## 🚀 Quick Start Guide

### Prerequisites

Before you start, make sure you have these installed on your computer:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Download/Clone the Project

```bash
# If you have the project folder, navigate to it
cd quiz-app

# Or if you need to download it, use git clone
git clone <repository-url>
cd quiz-app
```

### Step 2: Install Dependencies

Open your terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all the required packages. Wait for it to complete (usually takes 1-2 minutes).

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see output like this:
```
> quiz-app@0.0.0 dev
> vite

  VITE v7.1.7  ready in 83 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open the Game

1. Open your web browser
2. Go to `http://localhost:5173/` (or the URL shown in your terminal)
3. The Quiz App should load and display the welcome screen

## 🎯 How to Play - Complete Guide

### Phase 1: Welcome Screen
1. **Read the Rules**: Carefully read all the game rules
2. **Understand the Timers**: 
   - You have 1 minute total for all questions
   - Each question has 20 seconds maximum
   - Game ends if you don't answer within 20 seconds
3. **Click "Start Quiz"** to begin

### Phase 2: Quiz Start Screen
1. **Final Confirmation**: Review the timer rules one more time
2. **Warning Notice**: Pay attention to the yellow warning box
3. **Click "Start Quiz Now"** to begin the actual quiz

### Phase 3: Playing the Quiz

#### Understanding the Interface:
- **Total Time**: Shows remaining time for entire quiz (60 seconds)
- **Question Time**: Shows remaining time for current question (20 seconds)
- **Progress Bar**: Shows how many questions you've completed
- **Score**: Shows your current correct answers

#### Answering Questions:
1. **Read the Question**: Take time to understand what's being asked
2. **Read All Options**: Look at all 4 answer choices
3. **Make Your Choice**: Click on the answer you think is correct
4. **Instant Feedback**: 
   - ✅ Correct answer turns **GREEN**
   - ❌ Wrong answer turns **RED**
   - ⚪ Other options become disabled
5. **Auto-Advance**: Game automatically moves to next question after 1 second

#### Time Management Strategy:
- **Use Time Wisely**: You can spend more time on difficult questions within the 20-second limit
- **Don't Rush**: But remember, if 20 seconds pass without an answer, the game ends
- **Stay Focused**: The dual timer system requires quick thinking

### Phase 4: Results Screen

When the quiz ends (either by completing all questions or running out of time):

1. **Score Display**: See your percentage and total score
2. **Performance Message**: Get feedback based on your performance
3. **Options**:
   - **Retry Quiz**: Start over with the same questions
   - **Back to Start**: Return to the welcome screen

## 🎮 Game Rules - Detailed

### ⏱️ Timer Rules
- **Total Time**: 60 seconds for all 10 questions
- **Per Question**: Maximum 20 seconds per individual question
- **Game Over**: If you don't answer within 20 seconds, the quiz ends immediately
- **No Pause**: Timers cannot be paused or stopped

### 🎯 Scoring System
- **Correct Answer**: +1 point
- **Wrong Answer**: 0 points
- **No Answer**: 0 points (and game ends)
- **Final Score**: Displayed as both number and percentage

### 🚫 Game Over Conditions
1. **Time Out**: 20 seconds pass without selecting an answer
2. **Total Time**: 60 seconds total time runs out
3. **Manual End**: Completing all 10 questions

## 📁 Project Structure

```
quiz-app/
├── src/
│   ├── components/
│   │   ├── Welcome.jsx      # Welcome screen with rules
│   │   ├── Quiz.jsx         # Main quiz logic and dual timers
│   │   ├── Question.jsx     # Individual question display
│   │   ├── Timer.jsx        # Timer countdown component
│   │   └── Result.jsx       # Results screen with score
│   ├── data/
│   │   └── questions.js     # Quiz questions database
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and animations
├── package.json             # Project dependencies
└── README.md               # This file
```

## 🛠️ Development Commands

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Development Server
- **URL**: `http://localhost:5173/` (or next available port)
- **Hot Reload**: Changes update automatically
- **Console**: Check browser console for any errors

## 🎨 Customization Guide

### Adding New Questions

Edit `src/data/questions.js`:

```javascript
{
  id: 11,
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 2  // Index of correct option (0-based: 0, 1, 2, 3)
}
```

### Changing Timer Duration

Edit `src/components/Quiz.jsx`:

```javascript
// Change total time (currently 60 seconds)
const [totalTimeLeft, setTotalTimeLeft] = useState(60);

// Change per-question time (currently 20 seconds)
const [questionTimeLeft, setQuestionTimeLeft] = useState(20);
```

### Styling Customization

Edit `src/index.css` to customize:
- **Colors**: Change the green/red highlight colors
- **Fonts**: Modify typography and text styles
- **Animations**: Adjust transitions and effects
- **Layout**: Change spacing and positioning

## 🎯 Game Strategies & Tips

### ⚡ Speed Strategies
1. **Quick Scan**: Read questions and options quickly
2. **Eliminate Wrong**: Cross out obviously wrong answers
3. **Trust First Instinct**: Don't overthink simple questions
4. **Time Management**: Spend more time on difficult questions

### 🧠 Knowledge Tips
1. **General Knowledge**: Questions cover various topics
2. **Common Sense**: Many answers can be reasoned out
3. **Process of Elimination**: Use logic to narrow down choices
4. **Stay Calm**: Don't panic under time pressure

### 🎮 Gameplay Tips
1. **Practice**: Play multiple times to improve
2. **Learn from Mistakes**: Review wrong answers
3. **Stay Focused**: Avoid distractions during gameplay
4. **Have Fun**: It's a game, enjoy the challenge!

## 🐛 Troubleshooting

### Common Issues

**Problem**: App won't start
- **Solution**: Make sure Node.js is installed and run `npm install`

**Problem**: Port already in use
- **Solution**: The app will automatically find the next available port

**Problem**: Colors not showing
- **Solution**: Refresh the page or clear browser cache

**Problem**: Timer not working
- **Solution**: Check browser console for JavaScript errors

### Getting Help

1. **Check Console**: Open browser developer tools (F12) and check for errors
2. **Restart Server**: Stop the dev server (Ctrl+C) and run `npm run dev` again
3. **Clear Cache**: Hard refresh the page (Ctrl+Shift+R)
4. **Check Dependencies**: Run `npm install` to ensure all packages are installed

## 📱 Browser Compatibility

- ✅ **Chrome** (latest version)
- ✅ **Firefox** (latest version)
- ✅ **Safari** (latest version)
- ✅ **Edge** (latest version)
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🎉 Features in Detail

### Timer System
- **Dual Timer Display**: Shows both total and question time
- **Visual Countdown**: Color changes (green → orange → red)
- **Automatic End**: Game ends when time runs out
- **Smooth Animations**: Professional timer animations

### Question Management
- **One at a Time**: Focus on single question
- **Instant Feedback**: Immediate color highlighting
- **Auto-Advance**: Automatic progression after answering
- **Disabled State**: Prevents multiple selections

### Visual Design
- **Modern UI**: Clean, professional interface
- **Responsive**: Works on all screen sizes
- **Animations**: Smooth transitions and effects
- **Color Coding**: Clear visual feedback system

## 🏆 Scoring Guide

### Performance Levels
- **90-100%**: Excellent! 🎉
- **70-89%**: Great job! 👏
- **50-69%**: Good effort! 👍
- **Below 50%**: Keep practicing! 💪

### Tips for High Scores
1. **Answer Quickly**: Don't waste time on easy questions
2. **Stay Focused**: Avoid distractions
3. **Use Logic**: Reason through difficult questions
4. **Practice**: Play multiple times to improve

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to contribute to this project:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Submit** a pull request

## 🎯 Conclusion

This Quiz App with Timer is designed to be both challenging and fun. The dual timer system creates an exciting, fast-paced experience that tests both your knowledge and your ability to think quickly under pressure.

**Remember**: The key to success is staying calm, thinking quickly, and managing your time effectively. Good luck, and have fun! 🎮✨

---

**Ready to test your knowledge? Start the game now!** 🚀