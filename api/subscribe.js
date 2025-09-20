import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Star, Users, Dumbbell, Clock, CheckCircle, ArrowRight, Smartphone, CreditCard, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      setIsLoading(true)
      setError('')
      
      try {
        const response = await fetch('https://formspree.io/f/xeolyyrd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: email,
            type: 'email_signup',
            timestamp: new Date().toISOString()
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to save email')
        }

        setIsSubmitted(true)
        setShowSurvey(true)
        console.log('✅ Email saved successfully')
      } catch (error) {
        console.error('❌ Error saving email:', error)
        setError('Failed to save email. Please try again.')
      } finally {
        setIsLoading(false)
      }
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

  const handleOpenAnswerSubmit = async () => {
    const finalAnswers = {
      ...surveyAnswers,
      openFeedback: openAnswer
    }
    
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/xeolyyrd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'survey_response',
          userType: finalAnswers.userType,
          currentSolution: finalAnswers.currentSolution,
          priceRange: finalAnswers.priceRange,
          features: finalAnswers.features,
          openFeedback: finalAnswers.openFeedback,
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save survey response')
      }

      setSurveyAnswers(prev => ({
        ...prev,
        openFeedback: openAnswer
      }))
      setShowSurvey(false)
      console.log('✅ Survey saved successfully')
    } catch (error) {
      console.error('❌ Error saving survey:', error)
      setError('Failed to save survey. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const skipSurvey = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/xeolyyrd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          type: 'survey_skipped',
          timestamp: new Date().toISOString()
        }),
      })

      console.log('✅ Email saved (survey skipped)')
    } catch (error) {
      console.error('❌ Error saving email:', error)
      setError('Failed to save email. Please try again.')
    } finally {
      setIsLoading(false)
    }

    setShowSurvey(false)
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
              disabled={isLoading}
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
                    disabled={isLoading}
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {currentQ.type === 'multiple' ? (
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSurveyAnswer(currentQ.id, option)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
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
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleOpenAnswerSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Complete Survey'}
                </Button>
              </div>
            )}

            <button 
              onClick={skipSurvey}
              className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Skip survey and just get notified'}
            </button>
          </div>
        </div>
      )}

      {/* Rest of your existing JSX remains the same... */}
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
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Book Any Gym,
                <span className="text-blue-600"> Anywhere, Anytime</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                No more subscriptions. No more commitments. Just flexible gym access when you need it. 
                Perfect for travelers, beginners, and fitness enthusiasts who want variety.
              </p>
              
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
                      disabled={isLoading}
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Get Notified'}
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thanks! We'll notify you when we launch.</span>
                  </div>
                )}
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Join 500+ fitness enthusiasts waiting for launch
                </p>
              </div>

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

      {/* ... rest of your existing sections remain the same ... */}
    </div>
  )
}

export default App
