import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Star, Users, Dumbbell, Clock, CheckCircle, ArrowRight, Smartphone, CreditCard, Shield, X, ChevronLeft, ChevronRight, Calculator, TrendingDown, Heart, Briefcase, Plane, Calendar, Phone, Search, XCircle, DollarSign, Zap, Building } from 'lucide-react'
import { Link } from 'react-router-dom'
import './App.css'
import heroMockup from './assets/hero-app-mockup-a87ba8ff.png'
import appMockup1 from './assets/app-mockup-1-39c03b37.png'
import appMockup2 from './assets/app-mockup-2-a93bf095.png'
import appMockup3 from './assets/app-mockup-3-a191474d.png'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const [openAnswer, setOpenAnswer] = useState('')
  
  // Calculator states
  const [membershipFee, setMembershipFee] = useState(3000)
  const [actualVisits, setActualVisits] = useState(12)
  const [membershipDuration, setMembershipDuration] = useState(1)

  // Calculate savings
  const monthlyFee = membershipFee
  const costPerVisit = monthlyFee / actualVisits
  const kyrosMonthlySpend = actualVisits * 245 // Assuming Tier 2 pricing
  const monthlyWaste = monthlyFee - kyrosMonthlySpend
  const annualSavings = monthlyWaste > 0 ? monthlyWaste * 12 : 0

  const surveyQuestions = [
    {
      id: 'userType',
      question: 'Which best describes you?',
      type: 'multiple',
      options: [
        'Business traveler who needs fitness access while traveling',
        'Fitness enthusiast who likes variety (gym, yoga, pilates)',
        'Beginner looking to explore fitness options',
        'Occasional user who prefers flexibility',
        'Someone looking to save money on fitness'
      ]
    },
    {
      id: 'currentSolution',
      question: 'How do you currently access fitness facilities?',
      type: 'multiple',
      options: [
        'Monthly/yearly gym membership',
        'Walk-in daily passes when needed',
        'Hotel gym when traveling',
        'Apps like FITPASS or similar',
        'I skip workouts due to lack of flexible options'
      ]
    },
    {
      id: 'fitnessTypes',
      question: 'Which types of fitness activities interest you?',
      type: 'multiple',
      options: [
        'Traditional gym and weight training',
        'Yoga and meditation',
        'Pilates and core training',
        'CrossFit and functional fitness',
        'Mixed - I like variety'
      ]
    },
    {
      id: 'painPoint',
      question: 'What\'s your biggest fitness membership pain point?',
      type: 'multiple',
      options: [
        'Paying for days I don\'t use',
        'Being stuck with one location',
        'Long-term commitments',
        'Lack of variety in workouts',
        'High upfront costs'
      ]
    },
    {
      id: 'features',
      question: 'Which KYROS feature excites you most?',
      type: 'multiple',
      options: [
        '30% cheaper daily passes',
        'Access to gyms, yoga, and pilates studios',
        'Pay-per-session packages',
        'No commitments or subscriptions',
        'Use across multiple cities'
      ]
    },
    {
      id: 'openFeedback',
      question: 'Help us build KYROS for you. Any specific requests?',
      type: 'open',
      placeholder: 'Tell us about your ideal fitness booking experience...'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setShowSurvey(true)
      console.log('Email submitted:', email)
    }
  }

  const handleSurveyAnswer = (questionId, answer) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
    
    if (currentQuestion < surveyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 300)
    }
  }

  const handleOpenAnswerSubmit = () => {
    setSurveyAnswers(prev => ({
      ...prev,
      openFeedback: openAnswer
    }))
    setShowSurvey(false)
    console.log('Survey completed:', { email, ...surveyAnswers, openFeedback: openAnswer })
  }

  const skipSurvey = () => {
    setShowSurvey(false)
    console.log('Survey skipped, email only:', email)
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const currentQ = surveyQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === surveyQuestions.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Survey Modal */}
      {showSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={skipSurvey}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {surveyQuestions.length}
                </span>
                {currentQuestion > 0 && (
                  <button 
                    onClick={goBack}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQ.question}
            </h3>

            {currentQ.type === 'multiple' ? (
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSurveyAnswer(currentQ.id, option)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={openAnswer}
                  onChange={(e) => setOpenAnswer(e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  onClick={handleOpenAnswerSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Complete Survey
                </Button>
              </div>
            )}

            <button 
              onClick={skipSurvey}
              className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Skip survey and just get notified
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold text-gray-900">
                KYROS<span className="text-blue-600">.</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#savings" className="text-gray-600 hover:text-blue-600 font-medium">Calculate Savings</a>
              <a href="#for-everyone" className="text-gray-600 hover:text-blue-600 font-medium">Who It's For</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium">FAQ</a>
              <Link to="/partners" className="text-gray-600 hover:text-blue-600 font-medium">For Centers</Link>
            </nav>
            <Button 
              onClick={() => document.getElementById('hero-email').scrollIntoView({ behavior: 'smooth' })} 
              variant="outline" 
              className="hidden md:block"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Updated */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Updated Content */}
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
                Stop Wasting ₹2,000+ Monthly
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Pay Only for the
                <span className="text-blue-600"> Fitness Sessions</span> You Actually Use
              </h1>
              <p className="text-xl text-gray-600 mb-3">
                Access 500+ gyms, yoga studios, and pilates centers across India. 
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <strong>Save 30-70%</strong> with daily passes and session packages. No subscriptions. No commitments. Just fitness on your terms.
              </p>
              
              {/* Email Signup Form */}
              <div className="mb-8" id="hero-email">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                    <Input
                      type="email"
                      placeholder="Enter your email for early access"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Join Waitlist
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thanks! We'll notify you when we launch in your city.</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  <Heart className="inline h-4 w-4 text-red-500" /> Help us launch! Share with friends who hate wasting money on unused gym memberships.
                </p>
              </div>

              {/* Updated Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm">30% Cheaper Than Walk-ins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Instant Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Right side - Hero Mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <img 
                  src={heroMockup} 
                  alt="KYROS App Main Screen" 
                  className="h-96 w-auto drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  Launching Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Fitness Access Problem You Face Today
            </h2>
            <p className="text-xl text-gray-600">
              Why are you still paying for gym days you don't use?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without KYROS */}
            <Card className="border-2 border-red-100 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900 flex items-center">
                  <XCircle className="h-6 w-6 mr-2" />
                  Without KYROS
                </CardTitle>
                <CardDescription className="text-red-700">The struggle is real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Search className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Google "gyms near me"</p>
                    <p className="text-gray-600">Incomplete info, outdated prices</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Call 5 different gyms</p>
                    <p className="text-gray-600">"Please visit to know our prices"</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">₹3,000/month membership</p>
                    <p className="text-gray-600">Use only 12 days = ₹250 per visit!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TrendingDown className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">₹1,500+ wasted monthly</p>
                    <p className="text-gray-600">That's ₹18,000 per year!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Travel for work?</p>
                    <p className="text-gray-600">Hotel gym has 2 broken treadmills</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Dumbbell className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Want yoga today?</p>
                    <p className="text-gray-600">Need another expensive membership</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With KYROS */}
            <Card className="border-2 border-green-100 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  With KYROS
                </CardTitle>
                <CardDescription className="text-green-700">Fitness made simple</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Smartphone className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Open app</p>
                    <p className="text-gray-600">See all options with real prices</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Book instantly</p>
                    <p className="text-gray-600">Real-time availability, instant confirmation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Pay ₹245 only when you go</p>
                    <p className="text-gray-600">Or get session packs for more savings</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TrendingDown className="h-5 w-5 text-green-600 mt-1 flex-shrink-0 transform rotate-180" />
                  <div>
                    <p className="font-semibold text-gray-900">Save ₹2,000+ monthly</p>
                    <p className="text-gray-600">That's a Goa trip every year!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Travel anywhere</p>
                    <p className="text-gray-600">Premium gym access in any city</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">One app, all fitness</p>
                    <p className="text-gray-600">Gym, yoga, pilates - all covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Savings Calculator */}
      <section id="savings" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Calculate How Much You're Wasting
            </h2>
            <p className="text-xl text-gray-600">
              See your actual cost per workout vs. KYROS pricing
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your current gym membership fee (monthly)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1500"
                      max="8000"
                      step="500"
                      value={membershipFee}
                      onChange={(e) => setMembershipFee(Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="text-2xl font-bold text-gray-900 w-24">
                      ₹{membershipFee}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How often do you actually go? (times per month)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[4, 8, 12, 16, 20].map((visits) => (
                      <button
                        key={visits}
                        onClick={() => setActualVisits(visits)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          actualVisits === visits 
                            ? 'border-blue-600 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {visits}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border-2 border-red-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Reality:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost per actual workout:</span>
                      <span className="text-2xl font-bold text-red-600">₹{Math.round(costPerVisit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly waste:</span>
                      <span className="text-xl font-semibold text-red-600">
                        ₹{Math.round(Math.max(0, membershipFee - (actualVisits * Math.round(costPerVisit))))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">With KYROS:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">You'd pay for {actualVisits} sessions:</span>
                      <span className="text-2xl font-bold text-green-600">₹{kyrosMonthlySpend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly savings:</span>
                      <span className="text-xl font-semibold text-green-600">
                        ₹{Math.round(Math.max(0, membershipFee - kyrosMonthlySpend))}
                      </span>
                    </div>
                    <div className="flex justify-between border-t-2 border-green-200 pt-2 mt-2">
                      <span className="text-gray-900 font-semibold">Annual savings:</span>
                      <span className="text-3xl font-bold text-green-600">
                        ₹{Math.round(annualSavings).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button 
                    onClick={() => document.getElementById('hero-email').scrollIntoView({ behavior: 'smooth' })}
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Saving ₹{Math.round(annualSavings).toLocaleString()} Per Year
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Join the waitlist and be first to access KYROS in your city
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Updated How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Book Fitness Sessions in 30 Seconds
            </h2>
            <p className="text-xl text-gray-600">
              No calls, no visits, no paperwork. Just fitness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 - Discovery */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup1} 
                  alt="Fitness Discovery Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <Badge className="mb-2 bg-blue-100 text-blue-700">Step 1</Badge>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover</h3>
              <p className="text-gray-600">
                Search gyms, yoga studios, pilates centers near you. 
                Filter by price, amenities, and rating. See real prices upfront.
              </p>
            </div>

            {/* Step 2 - Choose Pass */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup2} 
                  alt="Pass Selection Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <Badge className="mb-2 bg-blue-100 text-blue-700">Step 2</Badge>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Pass</h3>
              <p className="text-gray-600">
                Daily Pass: 30% off walk-in rates. Weekly Pass: For travelers.
                Session Packs: Maximum savings for regulars.
              </p>
            </div>

            {/* Step 3 - Book & Go */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup3} 
                  alt="Booking Confirmation Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <Badge className="mb-2 bg-blue-100 text-blue-700">Step 3</Badge>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book & Go</h3>
              <p className="text-gray-600">
                Instant confirmation with QR code. Show at reception and start working out. 
                No forms, no hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Target Audience Section */}
      <section id="for-everyone" className="py-20 bg-gray-50">
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
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Business Travelers</CardTitle>
                <p className="text-sm text-red-600 italic">"Your Ramada gym has one broken treadmill"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access premium gyms in every city. No more missing workouts during business trips.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Occasional Users</CardTitle>
                <p className="text-sm text-red-600 italic">"Paying ₹3,000 to go 8 times = ₹375/visit"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pay only ₹245 per visit with daily passes. Save ₹2,000+ monthly instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Fitness Explorers</CardTitle>
                <p className="text-sm text-red-600 italic">"Monday Yoga, Wednesday Gym, Friday Pilates"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  One app for all fitness needs. No multiple memberships required.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-orange-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Budget-Conscious</CardTitle>
                <p className="text-sm text-red-600 italic">"Can't afford ₹5,000/month premium gym"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get premium gym access at ₹420/day only when you need it.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-yellow-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <XCircle className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Commitment-Phobic</CardTitle>
                <p className="text-sm text-red-600 italic">"What if I don't like it after joining?"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Try different centers with daily passes. No commitments, no regrets.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-indigo-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Busy Parents</CardTitle>
                <p className="text-sm text-red-600 italic">"Some weeks I can't go at all"</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Session packs valid for 6 months. Pay only for workouts you actually do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why KYROS Section - Keep as is, just update copy */}
      <section id="why-kyros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why KYROS Makes Sense
            </h2>
            <p className="text-xl text-gray-600">
              The smart way to access fitness facilities across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Zero Commitments</h3>
              <p className="text-gray-600">
                No contracts, no cancellation hassles, no guilt. 
                Skip a month? You save money. It's that simple.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Verified</h3>
              <p className="text-gray-600">
                Every partner center is verified for equipment, cleanliness, 
                and safety. We list only the best.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Everything</h3>
              <p className="text-gray-600">
                Book in 30 seconds, get QR code instantly, walk in like a member. 
                No forms, no waiting, no awkward sales pitches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about KYROS
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How is this different from FITPASS?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  FITPASS charges monthly subscriptions with hidden restrictions and blackout times. 
                  KYROS has no subscriptions - you pay only when you actually workout. Our pricing is transparent, 
                  centers get fair compensation (75-80% vs FITPASS's low payouts), and there are no hidden restrictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if my regular gym isn't on KYROS?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Help us bring them onboard! We have a referral program - when your gym joins through your referral, 
                  you'll get bonus credits. Meanwhile, explore other great options in your area.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use this across different cities?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! One KYROS account works everywhere we operate. Perfect for travelers and people who split time between cities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are session packs gym-specific?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, session packs are for specific centers (like buying a 10-session pack at your favorite gym). 
                  Daily passes work everywhere. This gives you the best of both worlds - commitment discounts where you want them, 
                  flexibility everywhere else.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does the pricing work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simple - all daily passes are 30% cheaper than walk-in rates. If a gym charges ₹500 for walk-ins, 
                  you pay ₹350 on KYROS. Session packs offer even deeper discounts for regular users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What types of fitness centers are included?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Everything! Traditional gyms, yoga studios, pilates centers, CrossFit boxes, martial arts dojos, 
                  dance studios, and swimming pools. One app for your complete fitness journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Help Us Launch KYROS
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're building KYROS to solve your fitness access problems. 
            Join our waitlist and help shape the future of fitness in India.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white"
                required
              />
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">
                Join Movement
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-blue-100 mb-6">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg">You're in! We'll notify you first when we launch.</span>
            </div>
          )}
          
          <div className="text-blue-100">
            <p className="mb-2">
              💪 Share with friends who waste money on unused gym memberships
            </p>
            <p className="text-sm">
              The more support we get, the faster we can launch in your city
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Updated */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">
                  KYROS<span className="text-blue-400">.</span>
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
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#savings" className="hover:text-white">Savings Calculator</a></li>
                <li><Link to="/partners" className="hover:text-white">For Fitness Centers</Link></li>
                <li><a href="#" className="hover:text-white">Coming Soon</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Join the Team</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Partner with Us</a></li>
              </ul>
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
    </div>
  )
}

export default App
