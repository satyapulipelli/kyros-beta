import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Star, Users, Dumbbell, Clock, CheckCircle, ArrowRight, Smartphone, CreditCard, Shield, X, ChevronLeft, ChevronRight, Calculator, TrendingDown, Heart, Briefcase, Plane, Calendar, Phone, Search, XCircle, DollarSign, Zap, Building, TrendingUp, Plus, Activity, Target, Award, ArrowUp, Mail } from 'lucide-react'
import './App.css'
import heroMockup from './assets/hero-app-mockup.png'
import appMockup1 from './assets/app-mockup-1.png'
import appMockup2 from './assets/app-mockup-2.png'
import appMockup3 from './assets/app-mockup-3.png'

function App() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const [openAnswer, setOpenAnswer] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [hasCalculated, setHasCalculated] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [membershipType, setMembershipType] = useState('yearly') // 'monthly' or 'yearly'
  
  // Calculator states - updated for monthly/yearly options
  const [monthlyFee, setMonthlyFee] = useState(3000)
  const [yearlyFee, setYearlyFee] = useState(30000)
  const [weeklyVisits, setWeeklyVisits] = useState(3)
  
  // Refs for scroll
  const problemCardsRef = useRef(null)
  const problemSectionRef = useRef(null)

  // Calculate savings with improved dynamic pricing logic
  const calculateSavings = () => {
    const actualMonthlyFee = membershipType === 'monthly' ? monthlyFee : yearlyFee / 12;
    const monthlyVisits = weeklyVisits * 4.3; // Average weeks per month
    const costPerVisit = actualMonthlyFee / monthlyVisits;
    
    // Dynamic savings formula based on usage frequency
    // The less you go, the more you save with pay-per-use
    let savingsPercentage;
    
    // Base savings calculation - higher savings for lower frequency users
    if (weeklyVisits === 1) {
      savingsPercentage = 0.50; // 50% savings for 1x/week
    } else if (weeklyVisits === 2) {
      savingsPercentage = 0.40; // 40% savings for 2x/week
    } else if (weeklyVisits === 3) {
      savingsPercentage = 0.30; // 30% savings for 3x/week
    } else if (weeklyVisits === 4) {
      savingsPercentage = 0.20; // 20% savings for 4x/week
    } else if (weeklyVisits === 5) {
      savingsPercentage = 0.10; // 10% savings for 5x/week
    } else {
      savingsPercentage = 0.05; // 5% savings for 6x/week
    }
    
    // Adjust based on membership cost
    // Higher membership fees = more potential waste = more savings
    const monthlyFeeAdjustment = actualMonthlyFee / 3000; // baseline ₹3000
    if (monthlyFeeAdjustment > 1.5) {
      savingsPercentage *= 1.15; // 15% boost for expensive memberships
    } else if (monthlyFeeAdjustment > 1.2) {
      savingsPercentage *= 1.08; // 8% boost for moderately expensive
    }
    
    // Ensure reasonable bounds
    savingsPercentage = Math.min(savingsPercentage, 0.55); // Cap at 55%
    savingsPercentage = Math.max(savingsPercentage, 0.03); // Minimum 3%
    
    // Calculate actual savings
    const monthlySavings = actualMonthlyFee * savingsPercentage;
    const annualSavings = monthlySavings * 12;
    
    return {
      monthlyFee: Math.round(actualMonthlyFee),
      monthlyVisits: Math.round(monthlyVisits),
      costPerVisit: Math.round(costPerVisit),
      savingsPercentage: Math.round(savingsPercentage * 100),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings)
    };
  };

  const savings = hasCalculated ? calculateSavings() : null;

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-flip first card on section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFlippedCards(new Set([0]));
            setTimeout(() => {
              setFlippedCards(new Set());
            }, 2000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (problemSectionRef.current) {
      observer.observe(problemSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollProblemCards = (direction) => {
    if (problemCardsRef.current) {
      const scrollAmount = 320;
      problemCardsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Updated problem cards with better content
  const problemCards = [
    {
      front: { title: 'Finding Gyms Sucks', desc: 'Outdated Google info, no prices' },
      back: { title: 'Live Discovery', desc: 'Real-time prices & availability' }
    },
    {
      front: { title: 'Phone Tag Hell', desc: 'Call 5 gyms, get 0 prices' },
      back: { title: 'Instant Booking', desc: 'See all options, book in seconds' }
    },
    {
      front: { title: 'Money Down the Drain', desc: '₹3000/month, use 10 times' },
      back: { title: 'Pay Per Visit', desc: 'Only pay when you actually go' }
    },
    {
      front: { title: 'Annual Commitment Trap', desc: '₹36,000 upfront, instant regret' },
      back: { title: 'Total Freedom', desc: 'No contracts, cancel anytime' }
    },
    {
      front: { title: 'Travel = Missed Workouts', desc: 'Hotel gym = 2 broken machines' },
      back: { title: 'Workout Anywhere', desc: 'Premium gyms in every city' }
    },
    {
      front: { title: 'One Type of Fitness', desc: 'Want yoga? Need another membership' },
      back: { title: 'Everything Included', desc: 'Gym, yoga, pilates - one app' }
    }
  ];

  // Simplified target audiences
  const targetAudiences = [
    {
      icon: Briefcase,
      title: 'Business Travelers',
      pain: 'Stuck with terrible hotel gyms',
      solution: 'Access premium gyms in any city instantly',
      price: '₹200-400/day',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Calendar,
      title: 'Occasional Users',
      pain: 'Paying full price for partial use',
      solution: 'Save 60%+ by paying only when you go',
      price: 'Save thousands monthly',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      icon: Activity,
      title: 'Fitness Variety Seekers',
      pain: 'Need multiple expensive memberships',
      solution: 'One app for gym, yoga, pilates, and more',
      price: 'All-access pass',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: Target,
      title: 'Budget-Conscious',
      pain: 'Premium gyms too expensive',
      solution: 'Premium access at budget prices',
      price: '70% cheaper',
      gradient: 'from-orange-400 to-red-400'
    },
    {
      icon: Heart,
      title: 'Commitment-Shy',
      pain: 'Scared of annual contracts',
      solution: 'Try different places, zero commitment',
      price: 'Daily flexibility',
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      icon: TrendingUp,
      title: 'Getting Back in Shape',
      pain: 'Not ready for full membership',
      solution: 'Start slow, scale up when ready',
      price: 'Your pace, your budget',
      gradient: 'from-indigo-400 to-purple-400'
    }
  ];

  const faqs = [
    {
      question: 'How is this different from FITPASS?',
      answer: 'FITPASS charges monthly subscriptions with hidden restrictions and blackout times. KYROS has no subscriptions - you pay only when you actually workout. Our pricing is transparent, centers get fair compensation (75-80% vs FITPASS\'s low payouts), and there are no hidden restrictions.'
    },
    {
      question: 'What if my regular gym isn\'t on KYROS?',
      answer: 'Help us bring them onboard! We have a referral program - when your gym joins through your referral, you\'ll get bonus credits. Meanwhile, explore other great options in your area.'
    },
    {
      question: 'Can I use this across different cities?',
      answer: 'Absolutely! One KYROS account works everywhere we operate. Perfect for travelers and people who split time between cities.'
    },
    {
      question: 'Are session packs gym-specific?',
      answer: 'Yes, session packs are for specific centers (like buying a 10-session pack at your favorite gym). Daily passes work everywhere. This gives you the best of both worlds - commitment discounts where you want them, flexibility everywhere else.'
    },
    {
      question: 'How does the pricing work?',
      answer: 'Simple - all daily passes are 30% cheaper than walk-in rates. If a gym charges ₹500 for walk-ins, you pay ₹350 on KYROS. Session packs offer even deeper discounts for regular users.'
    },
    {
      question: 'What types of fitness centers are included?',
      answer: 'Everything! Traditional gyms, yoga studios, pilates centers, CrossFit boxes, martial arts dojos, dance studios, and swimming pools. One app for your complete fitness journey.'
    },
    {
      question: 'How does payment work?',
      answer: 'Pay securely through the app using UPI, cards, or wallets. No cash needed at the gym.'
    },
    {
      question: 'Which cities are you available in?',
      answer: 'Starting with major metros, expanding to 50+ cities in 2025. Join the waitlist for your city.'
    }
  ];

  const surveyQuestions = [
    {
      id: 'userType',
      question: 'Which best describes you?',
      type: 'multiple',
      options: [
        { key: 'A', text: 'Business traveler' },
        { key: 'B', text: 'Fitness enthusiast' },
        { key: 'C', text: 'Beginner explorer' },
        { key: 'D', text: 'Occasional user' },
        { key: 'E', text: 'Budget-conscious' }
      ]
    },
    {
      id: 'features',
      question: 'Which KYROS feature excites you most?',
      type: 'multiple',
      options: [
        { key: 'A', text: '30% cheaper daily passes' },
        { key: 'B', text: 'Access to all fitness types' },
        { key: 'C', text: 'Pay-per-session packages' },
        { key: 'D', text: 'No commitments' },
        { key: 'E', text: 'Multi-city access' }
      ]
    },
    {
      id: 'painPoint',
      question: 'What\'s your biggest fitness membership pain?',
      type: 'multiple',
      options: [
        { key: 'A', text: 'Paying for unused days' },
        { key: 'B', text: 'Stuck with one location' },
        { key: 'C', text: 'Long-term commitments' },
        { key: 'D', text: 'Lack of variety' },
        { key: 'E', text: 'High upfront costs' }
      ]
    },
    {
      id: 'priceRange',
      question: 'What\'s your ideal per-session price?',
      type: 'multiple',
      options: [
        { key: 'A', text: '₹150-200' },
        { key: 'B', text: '₹200-250' },
        { key: 'C', text: '₹250-300' },
        { key: 'D', text: '₹300-400' },
        { key: 'E', text: 'Value matters more' }
      ]
    },
    {
      id: 'location',
      question: 'Where do you need KYROS?',
      type: 'open',
      placeholder: 'Enter your city or area...'
    }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = () => {
    setEmailError('');
    
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitted(true);
    setShowModal(true);
    setSurveyAnswers({ email });
    setCurrentQuestion(0);
  };

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  const handleSurveyAnswer = (answer) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [surveyQuestions[currentQuestion].id]: answer
    }));
    
    if (currentQuestion < surveyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowModal(false);
        console.log('Survey completed:', surveyAnswers);
      }, 500);
    }
  };

  const currentQ = surveyQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-all hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Survey Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full min-h-[500px] p-8 relative flex flex-col">
            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {surveyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentQuestion 
                      ? 'bg-purple-500 w-8' 
                      : index < currentQuestion 
                      ? 'bg-purple-300' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Question Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                {currentQ.question}
              </h3>

              {currentQ.type === 'multiple' ? (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <div
                      key={option.key}
                      onClick={() => handleSurveyAnswer(option.text)}
                      className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition-all group"
                    >
                      <div className="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center mr-4 group-hover:border-purple-400">
                        <span className="text-sm font-semibold text-gray-500 group-hover:text-purple-600">
                          {option.key}
                        </span>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {option.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && openAnswer) {
                        handleSurveyAnswer(openAnswer);
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => openAnswer && handleSurveyAnswer(openAnswer)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Complete Survey
                  </button>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              {currentQuestion > 0 ? (
                <button
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Skip to end
              </button>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => scrollToTop()}
              className="flex items-center cursor-pointer"
            >
              <span className="text-3xl font-extrabold text-gray-900">
                KYROS<span className="text-indigo-400">.</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#problems" 
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Problems
              </a>
              <a 
                href="#calculator" 
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                How It Works
              </a>
              <a href="#audience" className="text-gray-600 hover:text-indigo-600 font-medium">
                Who It's For
              </a>
              <a href="#faq" className="text-gray-600 hover:text-indigo-600 font-medium">
                FAQs
              </a>
            </nav>
            <button
              onClick={() => {
                if (!isSubmitted) {
                  const heroEmailElement = document.getElementById('hero-email-section');
                  if (heroEmailElement) {
                    heroEmailElement.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      const emailInput = document.getElementById('hero-email');
                      if (emailInput) emailInput.focus();
                    }, 500);
                  }
                } else {
                  setShowModal(true);
                }
              }}
              className="hidden md:block px-5 py-2 border-2 border-indigo-400 text-indigo-600 rounded-lg hover:bg-indigo-400 hover:text-white transition-colors font-medium"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
                Coming Soon
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Access Any Gym, Anytime.
                <span className="text-indigo-500"> Save Every Time.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-3">
                Gyms, yoga studios, pilates centers - all in one app.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Save 30-70% with pay-per-use passes. No subscriptions, no commitments.
              </p>
              
              {/* Email Signup */}
              <div className="mb-8" id="hero-email-section">
                {!isSubmitted ? (
                  <div>
                    <div className="flex gap-2 max-w-md">
                      <div className="flex-1">
                        <Input
                          id="hero-email"
                          type="email"
                          placeholder="Enter your email for early access"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                          }}
                          className={`w-full ${emailError ? 'border-red-500' : ''}`}
                          onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                        />
                        {emailError && (
                          <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                      </div>
                      <Button 
                        onClick={handleEmailSubmit}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg"
                      >
                        Join Waitlist
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thanks! We'll notify you when we launch in your city.</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Help us launch! Share with friends who hate wasting money on unused gym memberships.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm">30% Cheaper</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-sm">Instant Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm">Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <img 
                  src={heroMockup} 
                  alt="KYROS App" 
                  className="h-96 w-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Chips Section */}
      <section ref={problemSectionRef} id="problems" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Fitness Experience
            </h2>
            <p className="text-xl text-gray-600">
              Hover over cards to see the KYROS difference
            </p>
          </div>

          <div 
            className="relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setShowLeftArrow(x < 100);
              setShowRightArrow(x > rect.width - 100);
            }}
            onMouseLeave={() => {
              setShowLeftArrow(false);
              setShowRightArrow(false);
            }}
          >
            {/* Left Arrow - Netflix Style */}
            <button
              onClick={() => scrollProblemCards('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-all ${
                showLeftArrow ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
              }`}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            {/* Cards Container */}
            <div 
              ref={problemCardsRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {problemCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 h-48"
                  onMouseEnter={() => setFlippedCards(prev => new Set([...prev, index]))}
                  onMouseLeave={() => setFlippedCards(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                  })}
                  style={{ perspective: '1000px' }}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 ${
                    flippedCards.has(index) ? 'rotate-y-180' : ''
                  }`} style={{ transformStyle: 'preserve-3d' }}>
                    {/* Front */}
                    <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center backface-hidden">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                        <XCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{card.front.title}</h3>
                      <p className="text-gray-600">{card.front.desc}</p>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl shadow-lg p-6 flex flex-col justify-center backface-hidden rotate-y-180" style={{ transform: 'rotateY(180deg)' }}>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{card.back.title}</h3>
                      <p className="text-white/90">{card.back.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Arrow - Netflix Style */}
            <button
              onClick={() => scrollProblemCards('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-all ${
                showRightArrow ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
              }`}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Calculator + How It Works Section */}
      <section id="calculator" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See How Much You'll Save in 30 Seconds
            </h2>
            <p className="text-xl text-gray-600">
              Real prices. Real savings. Real simple.
            </p>
          </div>

          <div className="flex items-center">
            <div className="grid lg:grid-cols-5 gap-8 items-center w-full">
              {/* Calculator - Left Side (40%) */}
              <div className="lg:col-span-2">
                <Card className="shadow-xl bg-white/80 backdrop-blur h-full">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Membership Type Toggle */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Current Membership Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setMembershipType('monthly')}
                            className={`p-3 rounded-lg border-2 transition-colors font-medium ${
                              membershipType === 'monthly' 
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setMembershipType('yearly')}
                            className={`p-3 rounded-lg border-2 transition-colors font-medium ${
                              membershipType === 'yearly' 
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            Yearly
                          </button>
                        </div>
                      </div>

                      {/* Membership Fee Slider */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your {membershipType === 'monthly' ? 'Monthly' : 'Yearly'} Gym Fee
                        </label>
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{membershipType === 'monthly' 
                              ? monthlyFee.toLocaleString() 
                              : yearlyFee.toLocaleString()}
                          </span>
                          {membershipType === 'yearly' && (
                            <span className="text-sm text-gray-500">
                              (₹{Math.round(yearlyFee/12).toLocaleString()}/month)
                            </span>
                          )}
                        </div>
                        {membershipType === 'monthly' ? (
                          <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="500"
                            value={monthlyFee}
                            onChange={(e) => setMonthlyFee(Number(e.target.value))}
                            className="w-full mt-2 accent-indigo-500"
                            style={{
                              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(monthlyFee - 1000) / (10000 - 1000) * 100}%, #e5e7eb ${(monthlyFee - 1000) / (10000 - 1000) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                        ) : (
                          <input
                            type="range"
                            min="10000"
                            max="50000"
                            step="500"
                            value={yearlyFee}
                            onChange={(e) => setYearlyFee(Number(e.target.value))}
                            className="w-full mt-2 accent-indigo-500"
                            style={{
                              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(yearlyFee - 10000) / (50000 - 10000) * 100}%, #e5e7eb ${(yearlyFee - 10000) / (50000 - 10000) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                        )}
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>₹{membershipType === 'monthly' ? '1,000' : '10,000'}</span>
                          <span>₹{membershipType === 'monthly' ? '10,000' : '50,000'}+</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gym Visits Per Week
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map((visits) => (
                            <button
                              key={visits}
                              onClick={() => setWeeklyVisits(visits)}
                              className={`p-2 rounded-lg border-2 transition-colors text-sm ${
                                weeklyVisits === visits 
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {visits}x/week
                            </button>
                          ))}
                        </div>
                      </div>

                      {hasCalculated && savings ? (
                        <div className="space-y-3">
                          <div className="h-px bg-gray-200" />
                          
                          <div className="space-y-3">
                            {/* Current Cost Display */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Your cost per visit:</span>
                                <span className="text-xl font-bold text-gray-900">₹{savings.costPerVisit}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Based on {savings.monthlyVisits} visits/month
                              </div>
                            </div>
                            
                            {/* Savings Display */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-green-700">
                                  You're overpaying by
                                </span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                  {savings.savingsPercentage}%
                                </span>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                  <span className="text-gray-700 text-sm">Monthly Savings:</span>
                                  <span className="text-xl font-bold text-green-600">
                                    ₹{savings.monthlySavings.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                  <span className="text-gray-700 text-sm">Yearly Savings:</span>
                                  <span className="text-2xl font-bold text-green-600">
                                    ₹{savings.annualSavings.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Contextual message based on usage */}
                              <div className="mt-3 pt-3 border-t border-green-200">
                                {weeklyVisits <= 2 ? (
                                  <p className="text-xs text-green-700">
                                    🎯 Perfect for light users - pay only when you actually go!
                                  </p>
                                ) : weeklyVisits <= 4 ? (
                                  <p className="text-xs text-green-700">
                                    💪 Smart choice - save money while staying flexible
                                  </p>
                                ) : (
                                  <p className="text-xs text-green-700">
                                    ✨ Plus get access to 500+ locations when traveling
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={handleEmailSubmit}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg text-white"
                          >
                            Start Saving ₹{savings.annualSavings.toLocaleString()}/Year →
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Button 
                            onClick={handleCalculate}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg px-8 py-3"
                          >
                            Calculate My Savings
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* How It Works - Right Side (60%) */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={appMockup1} 
                        alt="Discover" 
                        className="h-64 w-auto rounded-xl shadow-lg"
                      />
                    </div>
                    <Badge className="mb-2 bg-indigo-100 text-indigo-700">Step 1</Badge>
                    <h3 className="font-semibold text-gray-900">Discover</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Find gyms near you. Real prices upfront.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={appMockup2} 
                        alt="Choose Pass" 
                        className="h-64 w-auto rounded-xl shadow-lg"
                      />
                    </div>
                    <Badge className="mb-2 bg-indigo-100 text-indigo-700">Step 2</Badge>
                    <h3 className="font-semibold text-gray-900">Choose Pass</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Daily, weekly, or sessions. Pick what fits.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={appMockup3} 
                        alt="Book & Go" 
                        className="h-64 w-auto rounded-xl shadow-lg"
                      />
                    </div>
                    <Badge className="mb-2 bg-indigo-100 text-indigo-700">Step 3</Badge>
                    <h3 className="font-semibold text-gray-900">Book & Go</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      QR code confirmation. Walk in and workout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="audience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Fitness Journey
            </h2>
            <p className="text-xl text-gray-600">
              Real problems, real solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${audience.gradient}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${audience.gradient} p-0.5`}>
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-red-500 italic font-medium">
                      {audience.pain}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {audience.solution}
                    </p>
                    <div className="pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {audience.price}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why KYROS Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why KYROS Makes Sense
            </h2>
            <p className="text-xl text-gray-600">
              The smart way to access fitness facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                  <Award className="h-10 w-10 text-blue-600 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Zero Commitments</h3>
                <p className="text-gray-600">
                  No contracts, no cancellation hassles, no guilt. Skip a month? You save money.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                  <Shield className="h-10 w-10 text-green-600 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Verified</h3>
                <p className="text-gray-600">
                  Every partner center is verified for equipment, cleanliness, and safety standards.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                  <Zap className="h-10 w-10 text-purple-600 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Everything</h3>
                <p className="text-gray-600">
                  Book in 30 seconds, get QR code instantly, walk in like a member. No hassles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about KYROS
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-45' : ''}`}>
                    <Plus className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all ${
                  expandedFaq === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Help Us Launch KYROS
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We're building KYROS to solve your fitness access problems. Join our waitlist and help shape the future of fitness in India.
          </p>
          
          {!isSubmitted ? (
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none text-gray-900 ${
                      emailError ? 'border-2 border-red-500' : ''
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  />
                </div>
                <button
                  onClick={handleEmailSubmit}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-bold whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </div>
              {emailError && (
                <p className="text-white/90 text-sm mt-1 text-left">{emailError}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-white mb-8">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg">You're in! We'll notify you first when we launch.</span>
            </div>
          )}
          
          <p className="text-white/80 mb-2 mt-8">
            Share with friends who waste money on unused gym memberships
          </p>
          <p className="text-white/70 text-sm">
            The more support we get, the faster we can launch in your city
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">
                  KYROS<span className="text-indigo-400">.</span>
                </span>
              </div>
              <p className="text-gray-400">
                Pay only for the fitness you actually use. 
                Gyms, yoga, pilates - all in one app.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#calculator" className="hover:text-white">How It Works</a></li>
                <li><a href="#calculator" className="hover:text-white">Savings Calculator</a></li>
                <li><a href="#" className="hover:text-white">For Fitness Centers</a></li>
                <li><a href="#" className="hover:text-white">Coming Soon</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <button
                onClick={() => window.location.href = 'mailto:pulipellisatyaharishreddy@gmail.com'}
                className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300"
              >
                <Mail className="h-4 w-4" />
                <span>Email us</span>
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KYROS. All rights reserved. Made with ❤️ in India.</p>
            <p className="text-sm mt-2">
              On a mission to save Indians ₹1000 Crores in unused gym memberships
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for flip animation and scrollbar hiding */}
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default App