import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FaqPage = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // Add custom CSS animations
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .animate-slide-in-right {
                animation: slideInRight 0.6s ease-out forwards;
            }
            
            .animate-bounce-in {
                animation: bounceIn 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const faqData = {
        "How To Buy": [
            {
                question: "How do I place an order?",
                answer: "To place an order, browse our product catalog, select your desired items, and add them to your cart. Once you're ready, go to checkout, provide your shipping and payment details, and confirm the order."
            },
            {
                question: "Can I buy items without creating an account?",
                answer: "Yes, you can make purchases as a guest without creating an account. However, creating an account allows you to track orders, save addresses, and access exclusive offers."
            },
            {
                question: "Is my payment information secure?",
                answer: "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers, ensuring maximum security."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely."
            },
            {
                question: "Can I modify my order after it's placed?",
                answer: "Orders can be modified within 1 hour of placement. Please contact our customer service team immediately if you need to make changes to your order."
            }
        ],
        "Exchanges & Returns": [
            {
                question: "What is your exchange policy?",
                answer: "We offer free exchanges within 30 days of purchase for items in original condition. You can exchange for a different size, color, or style of the same product."
            },
            {
                question: "How do I exchange an item?",
                answer: "To exchange an item, contact our customer service team with your order number and the item you'd like to exchange. We'll provide you with a prepaid return label and process your exchange."
            },
            {
                question: "Do I have to pay for return shipping on exchanges?",
                answer: "No, we cover the cost of return shipping for exchanges. We provide prepaid return labels to make the process convenient for our customers."
            },
            {
                question: "How long does the exchange process take?",
                answer: "The exchange process typically takes 7-10 business days from when we receive your returned item. We'll notify you once your new item ships."
            }
        ],
        "Refund Questions": [
            {
                question: "What is your refund policy?",
                answer: "We offer full refunds within 30 days of purchase for items in original, unused condition. Refunds are processed to your original payment method within 5-7 business days."
            },
            {
                question: "How long does it take to get my refund?",
                answer: "Refunds are typically processed within 5-7 business days after we receive your returned item. The time to appear in your account depends on your bank or credit card provider."
            },
            {
                question: "How will I know if my refund has been processed?",
                answer: "You'll receive an email confirmation once your refund is processed. You can also track the status of your return and refund in your account dashboard."
            }
        ]
    };

    const helpCategories = [
        "General Questions",
        "Product Information", 
        "Shipping & Delivery",
        "Exchanges & Returns",
        "Payment & Billing",
        "Technical Support"
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-7.jpg')] bg-cover bg-center h-[250px] text-white py-12">
                <div className="max-w-[1400px] mx-auto px-8">
                    <h1 className="text-4xl font-semibold mb-2 animate-bounce-in">Frequently Asked Questions</h1>
                    <div className="text-base text-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <Link to="/" className="hover:underline transition-all duration-300 hover:text-blue-200">
                            Homepage
                        </Link>{" "}
                        <span>&gt;</span> <span>Page</span> <span>&gt;</span>{" "}
                        <span>FAQs</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        
                        {/* Left Side - FAQ Accordion */}
                        <div className="space-y-8 lg:pr-8 order-2 lg:order-1">
                            {Object.entries(faqData).map(([category, questions], categoryIndex) => (
                                <div key={categoryIndex} className="space-y-4 animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                                    <h2 className="text-2xl font-semibold text-[#222] mb-6 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                                        {category}
                                    </h2>
                                    <div className="space-y-3">
                                        {questions.map((item, index) => {
                                            const accordionIndex = `${categoryIndex}-${index}`;
                                            const isOpen = openAccordion === accordionIndex;
                                            
                                            return (
                                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group">
                                                    <button
                                                        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-all duration-300 flex justify-between items-center group-hover:bg-blue-50"
                                                        onClick={() => toggleAccordion(accordionIndex)}
                                                    >
                                                        <span className="font-medium text-[#222] pr-4 group-hover:text-blue-600 transition-colors duration-300">
                                                            {item.question}
                                                        </span>
                                                        <div className="flex items-center">
                                                            <div className={`w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-all duration-300 ${
                                                                isOpen ? 'scale-150 bg-blue-500' : ''
                                                            }`}></div>
                                                            <svg
                                                                className={`w-5 h-5 text-gray-500 transition-all duration-500 ease-out ml-3 ${
                                                                    isOpen ? 'rotate-180 scale-110 text-blue-500' : 'group-hover:text-blue-400'
                                                                }`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                    <div 
                                                        className={`overflow-hidden transition-all duration-500 ease-out ${
                                                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                    >
                                                        <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 transform transition-all duration-500 ease-out ${
                                                            isOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
                                                        }`}>
                                                            <p className="text-gray-700 leading-relaxed">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="lg:sticky lg:top-8 animate-slide-in-right order-1 lg:order-2">
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 max-w-md mx-auto lg:mx-0">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-semibold text-[#222] mb-3">
                                        Ask Your Question
                                    </h2>
                                    <p className="text-gray-600 text-base">
                                        Ask Anything, We're Here to Help
                                    </p>
                                </div>

                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name*"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#222] focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="helpCategory" className="block text-sm font-medium text-gray-700 mb-2">
                                            How can we help you?
                                        </label>
                                        <select
                                            id="helpCategory"
                                            name="helpCategory"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#222] focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {helpCategories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            placeholder="Your Message*"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#222] focus:border-transparent transition-all duration-200 resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#222] text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                                    >
                                        Send Request
                                        <svg 
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FaqPage;