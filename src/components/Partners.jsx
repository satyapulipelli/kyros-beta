import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { TrendingUp, Users, Clock, CreditCard, Shield, CheckCircle, Building, DollarSign, BarChart, Calendar, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function Partners() {
  const [email, setEmail] = useState('')
  const [centerName, setCenterName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && centerName) {
      setIsSubmitted(true)
      console.log('Partner inquiry:', { email, centerName })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-3xl font-extrabold text-gray-900">
                KYROS<span className="text-blue-600">.</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 font-medium">Benefits</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#revenue" className="text-gray-600 hover:text-blue-600 font-medium">Revenue Model</a>
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">For Users</Link>
            </nav>
            <Button 
              onClick={() => document.getElementById('partner-form').scrollIntoView({ behavior: 'smooth' })} 
              className="hidden md:block bg-blue-600 hover:bg-blue-700"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
            For Fitness Centers, Yoga Studios & Pilates Centers
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Turn Empty Slots into
            <span className="text-blue-600"> 3x More Revenue</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get quality customers without spending on marketing. 
            Fill off-peak hours, reduce overcrowding, and increase revenue by 20-30%.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Zero onboarding fee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>You get 75-80% of booking value</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Weekly settlements</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Current Challenges vs. KYROS Solution
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Current Problems */}
            <Card className="border-2 border-red-100 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900">Current Reality</CardTitle>
                <CardDescription className="text-red-700">What you're dealing with daily</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">40-50% utilization during off-peak</p>
                    <p className="text-gray-600 text-sm">Morning and afternoon slots empty</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Only 5 walk-in customers monthly</p>
                    <p className="text-gray-600 text-sm">₹2,500 revenue from daily passes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">66% annual member churn</p>
                    <p className="text-gray-600 text-sm">Constantly need new members</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">High marketing costs</p>
                    <p className="text-gray-600 text-sm">₹5,000-10,000 per new member acquisition</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Peak hour overcrowding</p>
                    <p className="text-gray-600 text-sm">6-9 PM rush affects member experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With KYROS */}
            <Card className="border-2 border-green-100 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900">With KYROS</CardTitle>
                <CardDescription className="text-green-700">Your new revenue stream</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">70-80% utilization achieved</p>
                    <p className="text-gray-600 text-sm">Off-peak slots filled with KYROS users</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">25+ KYROS customers monthly</p>
                    <p className="text-gray-600 text-sm">₹7,000+ additional revenue</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">30% convert to members</p>
                    <p className="text-gray-600 text-sm">Quality leads who tried and loved your center</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Zero marketing spend</p>
                    <p className="text-gray-600 text-sm">KYROS brings customers to you</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Better crowd distribution</p>
                    <p className="text-gray-600 text-sm">Flexible users choose off-peak times</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Revenue Impact */}
      <section id="revenue" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Real Revenue Impact
            </h2>
            <p className="text-xl text-gray-600">
              Based on actual partner center data
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before KYROS */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Before KYROS (Monthly)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Regular members (200)</span>
                      <span className="font-semibold">₹6,00,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Walk-in passes (10 @ ₹350)</span>
                      <span className="font-semibold">₹3,500</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Personal training</span>
                      <span className="font-semibold">₹50,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>Total Revenue</span>
                      <span className="text-red-600">₹6,53,500</span>
                    </div>
                  </div>
                </div>

                {/* After KYROS */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">With KYROS (Monthly)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Regular members (unchanged)</span>
                      <span className="font-semibold">₹6,00,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Walk-in passes (10 @ ₹350)</span>
                      <span className="font-semibold">₹3,500</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">KYROS daily passes (50 @ ₹196)</span>
                      <span className="font-semibold">₹9,800</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">KYROS session packs (30 users)</span>
                      <span className="font-semibold">₹45,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Personal training (increased)</span>
                      <span className="font-semibold">₹60,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg font-bold">
                      <span>Total Revenue</span>
                      <span className="text-green-600">₹7,18,300</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <p className="text-3xl font-bold text-green-700 mb-2">
                  +₹64,800 Monthly (10% increase)
                </p>
                <p className="text-lg text-gray-700">
                  That's ₹7,77,600 additional revenue per year with ZERO marketing cost
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple Onboarding, Immediate Results
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-lg">Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick online form. Share basic details and pricing. Takes 5 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-lg">Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We verify your facilities and create your profile with photos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle className="text-lg">Go Live</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Start receiving bookings within 24 hours. Track everything on dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <CardTitle className="text-lg">Get Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Weekly settlements directly to your bank. Full transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Benefits Beyond Revenue
            </h2>
            <p className="text-xl text-gray-600">
              Operational improvements that matter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Leads</h3>
              <p className="text-gray-600">
                Users who try your center through KYROS have a 30% conversion rate to memberships. 
                They've already experienced your facilities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <BarChart className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Insights</h3>
              <p className="text-gray-600">
                Understand peak hours, equipment usage, customer preferences. 
                Make informed decisions about operations and investments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictable Revenue</h3>
              <p className="text-gray-600">
                Session packages are paid upfront. Know your revenue in advance. 
                Better cash flow management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              All Fitness Centers Welcome
            </h2>
            <p className="text-xl text-gray-600">
              Whatever you offer, we bring you customers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏋️", name: "Traditional Gyms", count: "Perfect fit" },
              { icon: "🧘", name: "Yoga Studios", count: "High demand" },
              { icon: "🤸", name: "Pilates Centers", count: "Premium users" },
              { icon: "🥊", name: "Boxing & MMA", count: "Growing market" },
              { icon: "🏃", name: "CrossFit Boxes", count: "Community builders" },
              { icon: "💃", name: "Dance Studios", count: "Variety seekers" },
              { icon: "🏊", name: "Swimming Pools", count: "Seasonal demand" },
              { icon: "🎾", name: "Sports Centers", count: "Multi-activity" }
            ].map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <h4 className="font-semibold text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Be Among the First Partner Centers
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Early partners get preferential placement, promotional support, 
            and exclusive territory advantages. Limited spots available.
          </p>
          
          <Card className="max-w-md mx-auto" id="partner-form">
            <CardContent className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your fitness center name"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Become a Partner Center
                  </Button>
                  <p className="text-xs text-gray-500">
                    Zero fees. You get 75-80% of every booking. Weekly payments.
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Thank you for your interest!
                  </h3>
                  <p className="text-gray-600">
                    We'll contact you within 24 hours to discuss partnership details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">
                KYROS<span className="text-blue-400">.</span>
              </span>
            </div>
            <p className="text-gray-400 mb-8">
              Partnering with fitness centers to make fitness accessible for everyone
            </p>
            
            <div className="flex justify-center space-x-8 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white">For Users</Link>
              <a href="#" className="text-gray-400 hover:text-white">Partner Support</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
              <p>&copy; 2024 KYROS. All rights reserved. Made with ❤️ in India.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Partners
