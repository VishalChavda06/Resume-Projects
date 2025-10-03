# Number Guessing Game / નંબર ગેસિંગ ગેમ

A minimal, fun game built with React + Tailwind. Guess a number between 1 and 100. Feedback updates live, guesses are tracked, and you can restart anytime.

React + Tailwind સાથે બનાવેલો એક નાનો પરંતુ મસ્ત ગેમ. 1 થી 100 વચ્ચેનો નંબર ગેસ કરો. તરત ફીડબેક મળે છે, બધા ગેસ સેવ થાય છે, અને રિસ્ટાર્ટ પણ તરત કરી શકો.

## Quick Start / ક્વિક સ્ટાર્ટ
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## How To Play (Mini Steps) / કેવી રીતે રમવું (મિની સ્ટેપ્સ)
1. Open the app / એપ ખોલો
2. Enter a number (1-100) / 1 થી 100 વચ્ચે નંબર લખો
3. Press Guess / Guess બટન દબાવો
4. See feedback: Too low / Too high / Correct! / ફીડબેક જુઓ
5. When correct, press Play Again / સાચું થાય પછી Play Again દબાવો

## Game Logic / ગેમ લોજિક
- Target number set on mount and restart using `generateRandomNumber()`
- Validate input 1–100; otherwise show message
- Compare guess with target → update feedback
- Push each guess into `guesses` history
- If equal → set `gameOver = true`

## Components / કમ્પોનન્ટ્સ
- `Pages/GamePage.jsx` – state, handlers, layout
- `Components/GuessForm.jsx` – input + submit
- `Components/FeddBack.jsx` – message panel
- `Components/History.jsx` – chips for past guesses
- `Components/GameOver.jsx` – result + restart

## Tailwind Classes Used / ટેલવિન્ડ ક્લાસિસ
- Layout: `max-w-xl mx-auto p-6`, `space-y-4`
- Inputs/Buttons: `h-10 px-3 border rounded-lg focus:ring-indigo-500`, `bg-indigo-600 hover:bg-indigo-700`
- Cards: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm`
- Chips: `px-2 py-1 text-sm bg-slate-100 rounded-md`

## Dev Tips / ડેવ ટીપ્સ
- Keep state minimal: `target, feedback, guesses, gameOver`
- Convert input to Number before compare
- Restart resets all state

Happy guessing! / મજા સાથે ગેસ કરો! 🎯
