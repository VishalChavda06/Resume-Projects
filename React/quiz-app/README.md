# 🎯 Quiz App with Timer - Complete Game Guide

આ એક modern, interactive quiz application છે જે React અને Vite સાથે બનાવવામાં આવી છે, જેમાં dual timers છે: 1-minute total timer અને 20-second per-question timer જે instant game-over functionality સાથે છે.

![Quiz App Demo](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Game Overview

આ એક fast-paced quiz game છે જે time pressure હેઠળ તમારા knowledgeની પરીક્ષા કરે છે. તમારી પાસે **10 questions**ના જવાબ માટે **1 minute total** છે, પરંતુ દરેક questionની **20-second limit** છે. જો તમે 20 secondsમાં જવાબ ન આપો, તો game તરત જ end થઈ જાય છે!

### 🏆 Key Features

- ⏱️ **Dual Timer System**: 1-minute total + 20-second per-question timer
- 🚫 **Game Over on Timeout**: Quiz ends immediately જો 20 secondsમાં જવાબ ન મળે
- 🎨 **Interactive Interface**: Multiple-choice questions સાથે instant feedback
- ✅ **Visual Feedback**: Correct answer માટે green, wrong answer માટે red color
- 📊 **Score Tracking**: Real-time score calculation
- 🏆 **Results Screen**: Performance analysis સાથે retry options
- 📱 **Responsive Design**: Desktop અને mobile devices પર કામ કરે છે
- ✨ **Smooth Animations**: Professional transitions અને effects

## 🚀 Quick Start Guide

### Prerequisites

શરૂ કરતા પહેલા, તમારા computer પર આ install કરવાની ખાતરી કરો:

- **Node.js** (version 14 અથવા higher) - [અહીં download કરો](https://nodejs.org/)
- **npm** (Node.js સાથે આવે છે) અથવા **yarn**
- એક modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Project Download/Clone કરો

```bash
# જો તમારી પાસે project folder છે, તો તેમાં જાઓ
cd quiz-app

# અથવા જો તમારે download કરવાની જરૂર છે, તો git clone વાપરો
git clone <repository-url>
cd quiz-app
```

### Step 2: Dependencies Install કરો

Project folderમાં તમારા terminal/command prompt ખોલો અને ચલાવો:

```bash
npm install
```

આ બધા required packages install કરશે. તે complete થાય ત્યાં સુધી wait કરો (usually 1-2 minutes લાગે છે).

### Step 3: Development Server શરૂ કરો

```bash
npm run dev
```

તમારે આવું output જોવા મળશે:
```
> quiz-app@0.0.0 dev
> vite

  VITE v7.1.7  ready in 83 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Game ખોલો

1. તમારો web browser ખોલો
2. `http://localhost:5173/` પર જાઓ (અથવા તમારા terminalમાં બતાવેલ URL)
3. Quiz App load થવી જોઈએ અને welcome screen બતાવવી જોઈએ

## 🎯 How to Play - Complete Guide

### Phase 1: Welcome Screen
1. **Rules વાંચો**: બધા game rules carefully વાંચો
2. **Timers સમજો**: 
   - તમારી પાસે બધા questions માટે total 1 minute છે
   - દરેક questionની maximum 20 seconds છે
   - 20 secondsમાં જવાબ ન આપો તો game end થાય છે
3. **"Start Quiz" click કરો** શરૂ કરવા માટે

### Phase 2: Quiz Start Screen
1. **Final Confirmation**: Timer rulesની એક વાર ફરી review કરો
2. **Warning Notice**: Yellow warning box પર attention આપો
3. **"Start Quiz Now" click કરો** actual quiz શરૂ કરવા માટે

### Phase 3: Playing the Quiz

#### Interface સમજવું:
- **Total Time**: Entire quiz માટે remaining time બતાવે છે (60 seconds)
- **Question Time**: Current question માટે remaining time બતાવે છે (20 seconds)
- **Progress Bar**: તમે કેટલા questions complete કર્યા છે તે બતાવે છે
- **Score**: તમારા current correct answers બતાવે છે

#### Questionsના જવાબ આપવા:
1. **Question વાંચો**: શું પૂછવામાં આવી રહ્યું છે તે understand કરવા માટે time લો
2. **All Options વાંચો**: બધા 4 answer choices જુઓ
3. **Your Choice કરો**: તમને લાગે છે કે correct છે તે answer પર click કરો
4. **Instant Feedback**: 
   - ✅ Correct answer **GREEN** થાય છે
   - ❌ Wrong answer **RED** થાય છે
   - ⚪ Other options disabled થઈ જાય છે
5. **Auto-Advance**: 1 second પછી game automatically next question પર જાય છે

#### Time Management Strategy:
- **Time wisely વાપરો**: 20-second limitમાં difficult questions પર વધુ time ગાળી શકો છો
- **Rush ન કરો**: પરંતુ remember કરો, 20 seconds વિના answer વીતી જાય તો game end થાય છે
- **Focused રહો**: Dual timer systemને quick thinkingની જરૂર છે

### Phase 4: Results Screen

જ્યારે quiz end થાય છે (બધા questions complete કરીને અથવા time પૂરો થઈને):

1. **Score Display**: તમારી percentage અને total score જુઓ
2. **Performance Message**: તમારા performanceના આધારે feedback મેળવો
3. **Options**:
   - **Retry Quiz**: Same questions સાથે ફરીથી શરૂ કરો
   - **Back to Start**: Welcome screen પર પાછા જાઓ

## 🎮 Game Rules - Detailed

### ⏱️ Timer Rules
- **Total Time**: બધા 10 questions માટે 60 seconds
- **Per Question**: દરેક individual question માટે maximum 20 seconds
- **Game Over**: 20 secondsમાં જવાબ ન આપો તો quiz immediately end થાય છે
- **No Pause**: Timers pause કરી શકાતા નથી અથવા stop કરી શકાતા નથી

### 🎯 Scoring System
- **Correct Answer**: +1 point
- **Wrong Answer**: 0 points
- **No Answer**: 0 points (અને game end થાય છે)
- **Final Score**: Number અને percentage બંને તરીકે display થાય છે

### 🚫 Game Over Conditions
1. **Time Out**: Answer select કર્યા વિના 20 seconds વીતી જાય
2. **Total Time**: 60 secondsનો total time પૂરો થાય
3. **Manual End**: બધા 10 questions complete કરવા

## 📁 Project Structure

```
quiz-app/
├── src/
│   ├── components/
│   │   ├── Welcome.jsx      # Rules સાથે welcome screen
│   │   ├── Quiz.jsx         # Main quiz logic અને dual timers
│   │   ├── Question.jsx     # Individual question display
│   │   ├── Timer.jsx        # Timer countdown component
│   │   └── Result.jsx       # Score સાથે results screen
│   ├── data/
│   │   └── questions.js     # Quiz questions database
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles અને animations
├── package.json             # Project dependencies
└── README.md               # આ file
```

## 🛠️ Development Commands

### Available Scripts

```bash
# Development server શરૂ કરો
npm run dev

# Production માટે build કરો
npm run build

# Production build preview
npm run preview

# Linting ચલાવો
npm run lint
```

### Development Server
- **URL**: `http://localhost:5173/` (અથવા next available port)
- **Hot Reload**: Changes automatically update થાય છે
- **Console**: કોઈપણ errors માટે browser console તપાસો

## 🎨 Customization Guide

### નવા Questions ઉમેરવા

`src/data/questions.js` edit કરો:

```javascript
{
  id: 11,
  question: "તમારો question અહીં?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 2  // Correct optionનો index (0-based: 0, 1, 2, 3)
}
```

### Timer Duration બદલવી

`src/components/Quiz.jsx` edit કરો:

```javascript
// Total time બદલો (currently 60 seconds)
const [totalTimeLeft, setTotalTimeLeft] = useState(60);

// Per-question time બદલો (currently 20 seconds)
const [questionTimeLeft, setQuestionTimeLeft] = useState(20);
```

### Styling Customization

Customize કરવા માટે `src/index.css` edit કરો:
- **Colors**: Green/red highlight colors બદલો
- **Fonts**: Typography અને text styles modify કરો
- **Animations**: Transitions અને effects adjust કરો
- **Layout**: Spacing અને positioning બદલો

## 🎯 Game Strategies & Tips

### ⚡ Speed Strategies
1. **Quick Scan**: Questions અને options ઝડપથી વાંચો
2. **Eliminate Wrong**: Obviously wrong answers કાઢી નાખો
3. **Trust First Instinct**: Simple questions પર overthink ન કરો
4. **Time Management**: Difficult questions પર વધુ time ગાળો

### 🧠 Knowledge Tips
1. **General Knowledge**: Questions various topicsને cover કરે છે
2. **Common Sense**: ઘણા answers logicથી શોધી શકાય છે
3. **Process of Elimination**: Choices narrow કરવા માટે logic વાપરો
4. **Stay Calm**: Time pressure હેઠળ panic ન કરો

### 🎮 Gameplay Tips
1. **Practice**: Improve કરવા માટે multiple times ખેલો
2. **Learn from Mistakes**: Wrong answersની review કરો
3. **Stay Focused**: Gameplay દરમિયાન distractions avoid કરો
4. **Have Fun**: આ એક game છે, challengeનો enjoy કરો!

## 🐛 Troubleshooting

### Common Problems

**Problem**: App શરૂ થતી નથી
- **Solution**: Node.js install છે તેની ખાતરી કરો અને `npm install` ચલાવો

**Problem**: Port already in use
- **Solution**: App automatically next available port શોધશે

**Problem**: Colors દેખાતા નથી
- **Solution**: Page refresh કરો અથવા browser cache clear કરો

**Problem**: Timer કામ નથી કરતો
- **Solution**: JavaScript errors માટે browser console તપાસો

### Getting Help

1. **Console તપાસો**: Browser developer tools (F12) ખોલો અને errors તપાસો
2. **Server Restart કરો**: Dev server બંધ કરો (Ctrl+C) અને ફરીથી `npm run dev` ચલાવો
3. **Cache Clear કરો**: Page hard refresh કરો (Ctrl+Shift+R)
4. **Dependencies તપાસો**: બધા packages install છે તેની ખાતરી માટે `npm install` ચલાવો

## 📱 Browser Compatibility

- ✅ **Chrome** (latest version)
- ✅ **Firefox** (latest version)
- ✅ **Safari** (latest version)
- ✅ **Edge** (latest version)
- ✅ **Mobile Browsers** (iOS Safari, Chrome Mobile)

## 🎉 Features in Detail

### Timer System
- **Dual Timer Display**: Total અને question time બંને બતાવે છે
- **Visual Countdown**: Color changes (green → orange → red)
- **Automatic End**: Time પૂરો થાય ત્યારે game end થાય છે
- **Smooth Animations**: Professional timer animations

### Question Management
- **One at a Time**: એક question પર focus કરો
- **Instant Feedback**: Immediate color highlighting
- **Auto-Advance**: Answer આપ્યા પછી automatically progress
- **Disabled State**: Multiple selectionsને prevent કરે છે

### Visual Design
- **Modern UI**: Clean, professional interface
- **Responsive**: બધા screen sizes પર કામ કરે છે
- **Animations**: Smooth transitions અને effects
- **Color Coding**: Clear visual feedback system

## 🏆 Scoring Guide

### Performance Levels
- **90-100%**: Excellent! 🎉
- **70-89%**: Great job! 👏
- **50-69%**: Good effort! 👍
- **Below 50%**: Keep practicing! 💪

### High Score Tips
1. **Answer Quickly**: Simple questions પર time waste ન કરો
2. **Stay Focused**: Distractions avoid કરો
3. **Use Logic**: Difficult questionsમાંથી reason કરો
4. **Practice**: Improve કરવા માટે multiple times ખેલો

## 📄 License

આ project open source છે અને [MIT License](LICENSE) હેઠળ available છે.

## 🤝 Contributing

આ projectમાં contribute કરવા માટે free:

1. **Repository fork** કરો
2. **Feature branch બનાવો**
3. **તમારા changes** કરો
4. **Pull request** submit કરો

## 🎯 Conclusion

આ Quiz App with Timer challenging અને fun બંને બનવા માટે design કરવામાં આવી છે. Dual timer system એક exciting, fast-paced experience બનાવે છે જે તમારા knowledge અને pressure હેઠળ quickly think કરવાની ability બંનેની પરીક્ષા કરે છે.

**Remember**: Successની key calm રહેવી, quickly think કરવું અને તમારા timeને effectively manage કરવું છે. Good luck, અને મજા કરો! 🎮✨

---

**તમારા knowledgeની પરીક્ષા કરવા ready છો? હવે game શરૂ કરો!** 🚀