import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Star, Users, Dumbbell, Clock, CheckCircle, ArrowRight, Smartphone, CreditCard, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'
import heroMockup from './assets/hero-app-mockup.png'
import appMockup1 from './assets/app-mockup-1.png'
import appMockup2 from './assets/app-mockup-2.png'
import appMockup3 from './assets/app-mockup-3.png'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const [openAnswer, setOpenAnswer] = useState('')

  const surveyQuestions = [
    {
      id: 'userType',
      question: 'Which best describes you?',
      type: 'multiple',
      options: [
        'Business traveler who needs gym access while traveling',
        'Fitness enthusiast who likes trying different gyms',
        'Beginner looking to explore gym options',
        'Occasional gym user who prefers flexibility',
        'Someone who travels frequently for leisure'
      ]
    },
    {
      id: 'currentSolution',
      question: 'How do you currently find gyms when traveling or trying new places?',
      type: 'multiple',
      options: [
        'Google search and calling gyms directly',
        'Hotel gym (even if inadequate)',
        'Existing gym membership with multiple locations',
        'Apps like FITPASS or similar platforms',
        'I usually skip workouts when traveling'
      ]
    },
    {
      id: 'priceRange',
      question: 'What would you be willing to pay for a day pass at a quality gym?',
      type: 'multiple',
      options: [
        '₹199-₹299 (Budget-friendly)',
        '₹300-₹499 (Mid-range)',
        '₹500-₹799 (Premium)',
        '₹800+ (Luxury/High-end)',
        'It depends on the gym and amenities'
      ]
    },
    {
      id: 'features',
      question: 'Which feature would be most valuable to you?',
      type: 'multiple',
      options: [
        'Real-time availability and instant booking',
        'Detailed gym photos and amenity information',
        'User reviews and ratings',
        'Integration with nutrition/training consultations',
        'Corporate wellness program integration'
      ]
    },
    {
      id: 'openFeedback',
      question: 'Anything else you\'d like us to know about your gym booking needs?',
      type: 'open',
      placeholder: 'Share any specific requirements, concerns, or suggestions...'
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold text-gray-900">
                KYROS<span className="text-blue-600">.</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#for-everyone" className="text-gray-600 hover:text-blue-600 font-medium">For Everyone</a>
              <a href="#why-kyros" className="text-gray-600 hover:text-blue-600 font-medium">Why KYROS</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
            </nav>
            <Button variant="outline" className="hidden md:block">Get Early Access</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content following Z-pattern */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Book Any Gym,
                <span className="text-blue-600"> Anywhere, Anytime</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                No more subscriptions. No more commitments. Just flexible gym access when you need it. 
                Perfect for travelers, beginners, and fitness enthusiasts who want variety.
              </p>
              
              {/* Email Signup Form */}
              <div className="mb-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Get Notified
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thanks! We'll notify you when we launch.</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Join 500+ fitness enthusiasts waiting for launch
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span className="text-sm">Verified Gyms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">Instant Booking</span>
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
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Features Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and designed for the modern fitness enthusiast
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mockup 1 - Discovery */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup1} 
                  alt="Gym Discovery Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover Gyms</h3>
              <p className="text-gray-600">
                Find gyms near you with real-time availability, pricing, and reviews. 
                Filter by amenities, price range, and distance.
              </p>
            </div>

            {/* Mockup 2 - Booking */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup2} 
                  alt="Booking Confirmation Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Instantly</h3>
              <p className="text-gray-600">
                Secure your gym pass in seconds with UPI, cards, or digital wallets. 
                Get instant confirmation and QR codes.
              </p>
            </div>

            {/* Mockup 3 - Map View */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={appMockup3} 
                  alt="Map View Screen" 
                  className="h-96 w-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore on Map</h3>
              <p className="text-gray-600">
                See all available gyms on an interactive map. Perfect for travelers 
                and those exploring new areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="for-everyone" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perfect For Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're a beginner or a fitness enthusiast, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Beginners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Try different gyms to find the perfect fit without long-term commitments
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Travelers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Maintain your fitness routine anywhere in India with flexible day passes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Dumbbell className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Gym Hoppers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Explore variety and try new workout styles across different gyms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto bg-orange-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Busy Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Book gyms on-demand that fit your schedule and location needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why KYROS Section */}
      <section id="why-kyros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KYROS?
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Commitments</h3>
              <p className="text-gray-600">
                Pay per visit. No monthly subscriptions, no binding contracts. 
                Complete flexibility to work out when and where you want.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Quality</h3>
              <p className="text-gray-600">
                All partner gyms are personally verified for cleanliness, equipment quality, 
                and safety standards. Only the best make it to our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Access</h3>
              <p className="text-gray-600">
                Book and get instant confirmation. Generate QR codes for seamless entry. 
                No waiting, no paperwork, no hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Pay only for what you use. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Basic Gyms</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹199-₹299</span>
                  <span className="text-gray-600 ml-2">per visit</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Essential equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Clean facilities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Changing rooms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Water facilities
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-blue-600">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Premium Gyms</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹400-₹599</span>
                  <span className="text-gray-600 ml-2">per visit</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Modern equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    AC environment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Premium amenities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Group classes access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Trainer consultations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Luxury Gyms</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹700+</span>
                  <span className="text-gray-600 ml-2">per visit</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    State-of-the-art equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Spa & wellness facilities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Personal training
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Premium locations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Concierge services
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of fitness enthusiasts who choose flexibility over commitments
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
                Get Early Access
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-blue-100 mb-6">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg">Thanks! You're on the list for early access.</span>
            </div>
          )}
          
          <p className="text-blue-200">
            Be among the first to experience the future of fitness in India
          </p>
        </div>
      </section>

      {/* Footer */}
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
                Flexible gym access for the modern fitness enthusiast. 
                No subscriptions, just results.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Partner Gyms</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KYROS. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
