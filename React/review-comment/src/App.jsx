import { useState } from 'react'
import './App.css'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
	{
		id: 1,
		image: 'https://i.pinimg.com/736x/b6/dc/b2/b6dcb270eae6458889dc4f9b3d35cb56.jpg',
		title: 'Awesome Headphones',
		description:
			'Experience high-quality sound with noise cancellation and long battery life. Perfect for music lovers!',
		price: '$99.99',
	},
	{
		id: 2,
		image: 'https://i.pinimg.com/736x/00/22/a9/0022a9eb283ba672c92cdc2db32de556.jpg',
		title: 'Smart Watch',
		description: 'Track your fitness and stay connected with this stylish smart watch.',
		price: '$149.99',
	},
	{
		id: 3,
		image: 'https://i.pinimg.com/736x/3b/65/04/3b65042b9ca350c1128bde0ebb3a1b11.jpg',
		title: 'Wireless Speaker',
		description: 'Portable wireless speaker with deep bass and long battery life.',
		price: '$59.99',
	},
	{
		id: 4,
		image: 'https://i.pinimg.com/736x/5c/50/80/5c508012bce89b5e50f6b1f45facaea7.jpg',
		title: 'VR Headset',
		description: 'Immerse yourself in virtual reality with this comfortable VR headset.',
		price: '$199.99',
	},
	{
		id: 5,
		image: 'https://i.pinimg.com/736x/25/c1/95/25c1950a270103a278efd4798a90e85c.jpg',
		title: 'Bluetooth Earbuds',
		description: 'Compact and comfortable earbuds with crystal clear sound and long battery life.',
		price: '$79.99',
	},
	{
		id: 6,
		image: 'https://i.pinimg.com/736x/15/79/8f/15798f88d9109cf4e1429185352a9acf.jpg',
		title: 'Fitness Tracker',
		description: 'Monitor your health and activity with this sleek and waterproof fitness tracker.',
		price: '$39.99',
	},
]

// ProductCard: Displays a single product card with image, title, description, price, and star rating
function ProductCard({ product }) {
	// State for the selected rating
	const [rating, setRating] = useState(0)
	// State for the hovered star (for hover effect)
	const [hover, setHover] = useState(0)
	return (
		<Card className="w-full max-w-xl bg-white/90 border-0 shadow-2xl hover:shadow-pink-300/40 transition-shadow flex flex-row items-center p-4 gap-6 rounded-2xl group">
			<div className="w-40 h-40 rounded-xl overflow-hidden relative flex-shrink-0">
				<img
					src={product.image}
					alt={product.title}
					className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 to-transparent pointer-events-none" />
			</div>
			<div className="flex flex-col flex-1 justify-between h-full">
				<CardTitle className="text-2xl font-bold text-zinc-800 mb-1">
					{product.title}
				</CardTitle>
				<p className="text-zinc-600 text-base mb-2 min-h-[48px]">{product.description}</p>
				<div className="flex items-center justify-between mt-auto">
					<div className="text-xl font-bold text-pink-600">{product.price}</div>
					<div className="flex space-x-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<Button
								key={star}
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => setRating(star)}
								onMouseEnter={() => setHover(star)}
								onMouseLeave={() => setHover(0)}
								className={`p-0 h-7 w-7 transition-transform duration-200 ease-in-out hover:scale-125 hover:shadow-lg focus:scale-125 focus:shadow-lg ${((hover || rating) >= star) ? 'ring-2 ring-yellow-400/60' : ''}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill={(hover || rating) >= star ? '#fbbf24' : '#e5e7eb'}
									className="w-6 h-6 transition-colors duration-200 cursor-pointer drop-shadow-[0_1px_4px_rgba(251,191,36,0.25)]"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
								</svg>
							</Button>
						))}
					</div>
				</div>
				{rating > 0 && (
					<div className="text-sm text-yellow-600 mt-2">
						You rated this {rating} star{rating > 1 ? 's' : ''}!
					</div>
				)}
			</div>
		</Card>
	)
}

// App: Main component that renders the product grid
function App() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-200 via-indigo-200 to-purple-200 flex flex-col items-center py-10 px-2">
			<h1 className="text-4xl font-extrabold text-zinc-800 mb-10 tracking-wide drop-shadow-lg">
				Customer Reviews
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default App
