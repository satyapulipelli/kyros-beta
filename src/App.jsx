import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronLeft, ChevronDown, MapPin, Star, Users, Dumbbell, Clock, Shield, X, ArrowRight, Plus, Minus, Menu } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [membershipFee, setMembershipFee] = useState(3000)
  const [visitsPerMonth, setVisitsPerMonth] = useState(12)
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [showModal, setShowModal] = useState(false)
  const [surveyStep, setSurveyStep] = useState(0)
  const [surveyData, setSurveyData] = useState({ email: '' })
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const problemCardsRef = useRef(null)

  // Auto-flip first card when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && flippedCards.size === 0) {
            setFlippedCards(new Set([0]))
            setTimeout(() => {
              setFlippedCards(new Set())
            }, 2000)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (problemCardsRef.current) {
      observer.observe(problemCardsRef.current)
    }

    return () => observer.disconnect()
  }, [flippedCards])

  const toggleCardFlip = (index) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(index)) {
      newFlipped.delete(index)
    } else {
      newFlipped.add(index)
    }
    setFlippedCards(newFlipped)
  }

  const scrollProblemCards = (direction) => {
    if (problemCardsRef.current) {
      const scrollAmount = 320
      problemCardsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Calculator logic
  const kyrosPricing = (visits) => {
    if (visits <= 8) return 245
    if (visits <= 16) return 195
    if (visits <= 24) return 175
    return 165
  }

  const currentCostPerVisit = Math.round(membershipFee / visitsPerMonth)
  const kyrosCostPerVisit = kyrosPricing(visitsPerMonth)
  const kyrosTotalCost = kyrosCostPerVisit * visitsPerMonth
  const monthlySavings = membershipFee - kyrosTotalCost
  const annualSavings = monthlySavings * 12

  // Survey questions
  const surveyQuestions = [
    {
      type: 'email',
      title: "Let's personalize KYROS for you",
      subtitle: "Enter your email to get early access"
    },
    {
      type: 'choice',
      title: 'Which best describes you?',
      options: [
        'Business traveler',
        'Fitness enthusiast',
        'Beginner explorer',
        'Occasional user',
        'Budget-conscious'
      ]
    },
    {
      type: 'choice',
      title: 'How do you currently access fitness facilities?',
      options: [
        'Monthly/yearly gym membership',
        'Walk-in daily passes when needed',
        'Hotel gym when traveling',
        'Apps like FITPASS or similar',
        'I skip workouts due to lack of flexible options'
      ]
    },
    {
      type: 'choice',
      title: 'Which types of fitness activities interest you?',
      options: [
        'Traditional gym and weight training',
        'Yoga and meditation',
        'Pilates and core training',
        'CrossFit and functional fitness',
        'Mixed - I like variety'
      ]
    },
    {
      type: 'choice',
      title: "What's your biggest fitness membership pain point?",
      options: [
        "Paying for days I don't use",
        'Being stuck with one location',
        'Long-term commitments',
        'Lack of variety in workouts',
        'High upfront costs'
      ]
    },
    {
      type: 'choice',
      title: 'Which KYROS feature excites you most?',
      options: [
        '30% cheaper daily passes',
        'Access to gyms, yoga, and pilates studios',
        'Pay-per-session packages',
        'No commitments or subscriptions',
        'Use across multiple cities'
      ]
    }
  ]

  const handleSurveyAnswer = (answer) => {
    const currentQuestion = surveyQuestions[surveyStep]
    
    if (currentQuestion.type === 'email') {
      setSurveyData({ ...surveyData, email: answer })
    } else {
      setSurveyData({ ...surveyData, [`question_${surveyStep}`]: answer })
    }
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1)
    } else {
      // Survey complete
      console.log('Survey completed:', surveyData)
      setShowModal(false)
      setSurveyStep(0)
    }
  }

  const problemCards = [
    {
      front: { title: "Searching Blindly", desc: "Google = outdated info" },
      back: { title: "Live Discovery", desc: "Real prices, real-time" }
    },
    {
      front: { title: "Call 5 Gyms", desc: '"Visit for prices"' },
      back: { title: "Instant Booking", desc: "One tap. Done." }
    },
    {
      front: { title: "₹3000 for 12 Days", desc: "₹250 per visit" },
      back: { title: "₹245 Per Session", desc: "Pay only when you go" }
    },
    {
      front: { title: "₹18,000 Yearly Waste", desc: "Unused days" },
      back: { title: "Save ₹24,000/Year", desc: "That's a Europe trip!" }
    },
    {
      front: { title: "Hotel Gym Blues", desc: "2 treadmills, 1 broken" },
      back: { title: "Premium Everywhere", desc: "Any city, any gym" }
    },
    {
      front: { title: "Multiple Memberships", desc: "Gym + Yoga + Pilates" },
      back: { title: "One App", desc: "All fitness covered" }
    }
  ]

  const faqs = [
    {
      question: "How is this different from FITPASS?",
      answer: "FITPASS charges monthly subscriptions with hidden restrictions and blackout times. KYROS has no subscriptions - you pay only when you actually workout. Our pricing is transparent, centers get fair compensation (75-80% vs FITPASS's low payouts), and there are no hidden restrictions."
    },
    {
      question: "What if my regular gym isn't on KYROS?",
      answer: "Help us bring them onboard! We have a referral program - when your gym joins through your referral, you'll get bonus credits. Meanwhile, explore other great options in your area."
    },
    {
      question: "Can I use this across different cities?",
      answer: "Absolutely! One KYROS account works everywhere we operate. Perfect for travelers and people who split time between cities."
    },
    {
      question: "How does payment work?",
      answer: "Pay securely through the app using UPI, cards, or wallets. No cash needed at the gym."
    },
    {
      question: "Are there any hidden fees?",
      answer: "None. The price you see is the price you pay. No booking fees, no platform charges."
    },
    {
      question: "What if I need to cancel?",
      answer: "Free cancellation up to 2 hours before your session. No questions asked."
    },
    {
      question: "Do I need to install equipment?",
      answer: "Just download the app. No special equipment or cards needed - just show your QR code."
    },
    {
      question: "Which cities are you available in?",
      answer: "Starting with major metros, expanding to 50+ cities in 2025. Join the waitlist for your city."
    }
  ]

  const targetAudience = [
    {
      title: "BUSINESS TRAVELERS",
      quote: '"Your Ramada gym has one broken treadmill"',
      description: "Access premium gyms in every city. No more missing workouts during trips.",
      price: "₹245/day",
      gradient: "from-blue-500/20 to-blue-700/20",
      iconColor: "text-blue-600"
    },
    {
      title: "OCCASIONAL USERS",
      quote: '"Paying ₹3,000 to go 8 times = ₹375/visit"',
      description: "Pay only ₹245 per visit with daily passes. Save ₹2,000+ monthly instantly.",
      price: "₹245/visit",
      gradient: "from-green-500/20 to-teal-600/20",
      iconColor: "text-green-600"
    },
    {
      title: "FITNESS EXPLORERS",
      quote: '"Monday Yoga, Wednesday Gym, Friday Pilates"',
      description: "One app for all fitness needs. No multiple memberships required.",
      price: "All-in-one",
      gradient: "from-purple-500/20 to-pink-600/20",
      iconColor: "text-purple-600"
    },
    {
      title: "BUDGET-CONSCIOUS",
      quote: '"Can\'t afford ₹5,000/month premium gym"',
      description: "Get premium gym access at ₹420/day only when you need it.",
      price: "₹420/day",
      gradient: "from-orange-500/20 to-yellow-600/20",
      iconColor: "text-orange-600"
    },
    {
      title: "COMMITMENT-PHOBIC",
      quote: '"What if I don\'t like it after joining?"',
      description: "Try different centers with daily passes. No commitments, no regrets.",
      price: "Flexible",
      gradient: "from-teal-500/20 to-blue-600/20",
      iconColor: "text-teal-600"
    },
    {
      title: "BUSY PARENTS",
      quote: '"Some weeks I can\'t go at all"',
      description: "Session packs valid for 6 months. Pay only for workouts you actually do.",
      price: "Session packs",
      gradient: "from-rose-500/20 to-purple-600/20",
      iconColor: "text-rose-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Survey Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full min-h-[500px] flex flex-col relative">
            <button 
              onClick={() => {
                setShowModal(false)
                setSurveyStep(0)
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex-1 flex flex-col justify-center p-8 sm:p-12">
              {surveyStep < surveyQuestions.length && (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {surveyQuestions[surveyStep].title}
                    </h3>
                    {surveyQuestions[surveyStep].subtitle && (
                      <p className="text-gray-600">{surveyQuestions[surveyStep].subtitle}</p>
                    )}
                  </div>

                  {surveyQuestions[surveyStep].type === 'email' ? (
                    <div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                        value={surveyData.email || ''}
                        onChange={(e) => setSurveyData({ ...surveyData, email: e.target.value })}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (surveyData.email && surveyData.email.includes('@')) {
                            handleSurveyAnswer(surveyData.email)
                          }
                        }}
                        className="w-full mt-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Continue →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {surveyQuestions[surveyStep].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSurveyAnswer(option)}
                          className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 group-hover:text-gray-900">{option}</span>
                            <span className="text-gray-400 group-hover:text-purple-600 font-mono text-sm">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 p-6">
              {surveyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === surveyStep ? 'bg-purple-600 w-8' : 
                    index < surveyStep ? 'bg-purple-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {surveyStep > 0 && (
              <button
                onClick={() => setSurveyStep(surveyStep - 1)}
                className="absolute bottom-6 left-6 text-gray-500 hover:text-gray-700 flex items-center text-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold">
                KYROS<span className="text-purple-600">.</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                How KYROS Works
              </a>
              <a href="#calculator" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Calculate Your Savings
              </a>
              <a href="#who-its-for" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Who It's For
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                FAQs
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium"
              >
                Join Waitlist
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-3">
                <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium">
                  How KYROS Works
                </a>
                <a href="#calculator" className="text-gray-600 hover:text-purple-600 font-medium">
                  Calculate Your Savings
                </a>
                <a href="#who-its-for" className="text-gray-600 hover:text-purple-600 font-medium">
                  Who It's For
                </a>
                <a href="#faqs" className="text-gray-600 hover:text-purple-600 font-medium">
                  FAQs
                </a>
                <button
                  onClick={() => {
                    setShowModal(true)
                    setMobileMenuOpen(false)
                  }}
                  className="px-5 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full mb-6">
                Coming Soon
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Access Any Gym, Anytime.
                <span className="text-purple-600"> Save Every Time.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                Access gyms, yoga studios, and pilates centers across India
              </p>
              
              <p className="text-lg text-gray-600 mb-8">
                Daily passes 30% cheaper. Session packages for regulars. Zero commitments.
              </p>
              
              {/* Email Form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => {
                    if (email && email.includes('@')) {
                      setShowModal(true)
                    }
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Join Waitlist
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-8">
                Help us launch - shape the future of fitness in India
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">₹</span>
                  </div>
                  <span className="text-sm">30% cheaper</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm">Instant booking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm">Secure payments</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-[9/16] bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">K</span>
                    </div>
                    <p className="text-gray-600 text-sm">App mockup will be here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Problem vs The Solution
            </h2>
            <p className="text-xl text-gray-600">
              Hover over each card to see how KYROS solves your fitness access problems
            </p>
          </div>
          
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollProblemCards('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow hidden lg:block"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            
            {/* Cards Container */}
            <div 
              ref={problemCardsRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {problemCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-none w-72 h-40 snap-center"
                  onMouseEnter={() => toggleCardFlip(index)}
                  onMouseLeave={() => toggleCardFlip(index)}
                >
                  <div className={`relative w-full h-full transition-transform ${
                    flippedCards.has(index) ? '' : ''
                  }`} style={{ 
                    transformStyle: 'preserve-3d',
                    transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transitionDuration: '0.6s'
                  }}>
                    {/* Front */}
                    <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center" style={{
                      backfaceVisibility: 'hidden'
                    }}>
                      <div className="text-red-600 text-3xl mb-3">✗</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{card.front.title}</h3>
                      <p className="text-gray-600">{card.front.desc}</p>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col justify-center" style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}>
                      <div className="text-white text-3xl mb-3">✓</div>
                      <h3 className="text-xl font-bold text-white mb-2">{card.back.title}</h3>
                      <p className="text-white/90">{card.back.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Arrow */}
            <button
              onClick={() => scrollProblemCards('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow hidden lg:block"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Calculator + How It Works Section */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See How Much You'll Save in 30 Seconds
            </h2>
            <p className="text-xl text-gray-600">
              Real prices. Real savings. Real simple.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Calculator - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Your Gym Reality Check</h3>
                
                <div className="space-y-6">
                  {/* Monthly Fee Slider */}
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      Monthly Membership Fee
                    </label>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">₹{membershipFee}</span>
                    </div>
                    <input
                      type="range"
                      min="1500"
                      max="8000"
                      step="500"
                      value={membershipFee}
                      onChange={(e) => setMembershipFee(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>
                  
                  {/* Visits Buttons */}
                  <div>
                    <label className="text-sm text-gray-600 mb-3 block">
                      How Often You Go (times/month)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[4, 8, 12, 16, 20, 24].map((visits) => (
                        <button
                          key={visits}
                          onClick={() => setVisitsPerMonth(visits)}
                          className={`py-2 px-4 rounded-lg font-medium transition-all ${
                            visitsPerMonth === visits
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {visits}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="border-t pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Cost:</span>
                        <span className="text-xl font-bold text-gray-900">₹{currentCostPerVisit}/visit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">With KYROS:</span>
                        <span className="text-xl font-bold text-purple-600">₹{kyrosCostPerVisit}/visit</span>
                      </div>
                    </div>
                    
                    {monthlySavings > 0 ? (
                      <div className="mt-6 p-4 bg-green-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-1">
                            💰 ₹{monthlySavings.toLocaleString()}/month
                          </div>
                          <div className="text-lg text-green-700">
                            That's ₹{annualSavings.toLocaleString()}/year!
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700 mb-1">
                            Same price, unlimited options
                          </div>
                          <div className="text-sm text-blue-600">
                            Access 500+ locations with no commitment
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      {monthlySavings > 0 
                        ? `Start Saving ₹${annualSavings.toLocaleString()}/Year →`
                        : 'Get Flexibility at Same Cost →'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* How It Works - Right Side */}
            <div id="how-it-works" className="lg:col-span-3">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Book Fitness Sessions in 30 Seconds</h3>
              <p className="text-lg text-gray-600 mb-8">No calls, no visits, no paperwork. Just fitness.</p>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-none">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-8 mb-4">
                      <div className="aspect-[9/16] max-w-[200px] mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-purple-600" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Discover</h4>
                    <p className="text-gray-600">Find gyms near you. Real prices upfront.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-none">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-8 mb-4">
                      <div className="aspect-[9/16] max-w-[200px] mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-2">📋</div>
                          <div className="text-xs text-gray-600">Choose Pass</div>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Choose Pass</h4>
                    <p className="text-gray-600">Daily, weekly, or sessions. Pick what fits.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-none">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-8 mb-4">
                      <div className="aspect-[9/16] max-w-[200px] mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-1">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-gray-900"></div>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">QR Code</div>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Book & Go</h4>
                    <p className="text-gray-600">QR code confirmation. Walk in and workout.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="who-its-for" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Fitness Journey
            </h2>
            <p className="text-xl text-gray-600">
              Real problems, real solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((persona, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${persona.gradient} rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-2 group`}
              >
                <div className="absolute top-6 right-6 opacity-10 text-6xl">"</div>
                
                {/* Icon */}
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  {index === 0 && <div className="w-6 h-5 border-2 border-gray-700 rounded-sm relative"><div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-gray-700"></div></div>}
                  {index === 1 && <div className="relative"><div className="w-6 h-6 border-2 border-gray-700 rounded"></div><div className="absolute top-1 left-1 w-1 h-1 bg-gray-700 rounded-full"></div><div className="absolute top-1 right-1 w-1 h-1 bg-gray-700 rounded-full"></div><div className="absolute bottom-1 left-2 w-1 h-1 bg-gray-700 rounded-full"></div></div>}
                  {index === 2 && <div className="relative"><div className="w-6 h-6 border-2 border-gray-700 rounded-full"></div><div className="absolute top-0 -right-1 w-3 h-3 bg-white"><Dumbbell className="h-3 w-3 text-gray-700" /></div></div>}
                  {index === 3 && <div className="relative"><div className="w-5 h-6 border-2 border-gray-700 rounded"></div><div className="absolute -top-1 -right-1 text-gray-700 text-xs">↗</div></div>}
                  {index === 4 && <div className="relative"><div className="w-6 h-4 border-2 border-gray-700 rounded-sm border-dashed"></div><X className="h-3 w-3 text-gray-700 absolute -bottom-1 -right-1" /></div>}
                  {index === 5 && <Clock className="h-6 w-6 text-gray-700" />}
                </div>
                
                <h3 className="text-sm font-bold tracking-wider mb-3 text-gray-800">
                  {persona.title}
                </h3>
                
                <p className="text-lg italic mb-4 text-gray-700">
                  {persona.quote}
                </p>
                
                <p className="text-sm text-gray-600 mb-4">
                  {persona.description}
                </p>
                
                <div className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                  {persona.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KYROS Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why KYROS Makes Sense
            </h2>
            <p className="text-xl text-gray-600">
              The smart way to access fitness facilities across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Zero Commitments */}
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {/* No Contract Document Icon */}
                  <div className="relative">
                    <div className="w-10 h-12 border-2 border-purple-600 rounded"></div>
                    <X className="h-6 w-6 text-purple-600 absolute -bottom-1 -right-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Commitments</h3>
              <p className="text-gray-600">
                No contracts. No cancellation fees. No guilt. Your fitness, your rules.
              </p>
            </div>
            
            {/* Quality Verified */}
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {/* Verified Badge Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-green-600"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Verified</h3>
              <p className="text-gray-600">
                Handpicked partners. Equipment checked. Standards maintained. Quality guaranteed.
              </p>
            </div>
            
            {/* Instant Everything */}
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {/* Stopwatch with Swoosh Icon */}
                  <div className="relative">
                    <Clock className="h-10 w-10 text-purple-600" />
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-0.5 bg-purple-600"></div>
                      <div className="w-4 h-0.5 bg-purple-400 mt-1"></div>
                      <div className="w-2 h-0.5 bg-purple-200 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Everything</h3>
              <p className="text-gray-600">
                30-second booking. Instant QR code. Zero paperwork. Just walk in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about KYROS
            </p>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden transition-all"
              >
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Help Us Launch KYROS
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We're building KYROS to solve your fitness access problems. Join our waitlist and help shape the future of fitness in India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
            />
            <button
              onClick={() => {
                if (email && email.includes('@')) {
                  setShowModal(true)
                }
              }}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-bold"
            >
              Join Waitlist
            </button>
          </div>
          
          <p className="text-white/80 mb-2">
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
                  KYROS<span className="text-purple-400">.</span>
                </span>
              </div>
              <p className="text-gray-400">
                Pay only for the fitness you actually use. Gyms, yoga, pilates - all in one app.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">Savings Calculator</a></li>
                <li><span className="text-gray-600">For Fitness Centers</span></li>
                <li><span className="text-gray-600">Coming Soon</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email us at:{' '}
                <a href="mailto:pulipellisatyaharishreddy@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                  pulipellisatyaharishreddy@gmail.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KYROS. All rights reserved. Made with ❤️ in India.</p>
            <p className="mt-2 text-sm">On a mission to save Indians ₹1000 Crores in unused gym memberships</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App