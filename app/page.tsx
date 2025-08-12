"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit3 } from "lucide-react"
import { BookOpen } from "lucide-react"
import {
  Heart,
  MessageCircle,
  Bookmark,
  Home,
  User,
  Plus,
  Search,
  Mic,
  ArrowLeft,
  Settings,
  ChevronRight,
  Lock,
  Globe,
} from "lucide-react"

// Mock story data
const familyStories = [
  {
    id: 1,
    title: "Childhood New Year",
    timestamp: "2 mo. ago",
    image: "/chinese-new-year-family.png",
    author: "Grandma Chen",
    description: "A heartwarming story about celebrating Chinese New Year with the family.",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    title: "Grandfather at the Beach",
    timestamp: "3 mo. ago",
    image: "/sunset-beach-generations.png",
    author: "Mom",
    description: "A nostalgic tale of spending time with grandfather at the beach.",
    likes: 12,
    comments: 3,
  },
  {
    id: 3,
    title: "Sunday Family Dinners",
    timestamp: "1 mo. ago",
    image: "/placeholder-wull7.png",
    author: "Uncle Wei",
    description: "An account of the weekly family dinners and the love shared.",
    likes: 12,
    comments: 3,
  },
  {
    id: 4,
    title: "Learning to Drive with Dad",
    timestamp: "4 mo. ago",
    image: "/father-teenager-driving.png",
    author: "Li Hua",
    description: "A story about the journey of learning to drive with dad.",
    likes: 12,
    comments: 3,
  },
]

const communityStories = [
  {
    id: 1,
    title: "Under the Plum Tree",
    author: "Sarah Kim",
    category: "Family",
    emotion: "nostalgia",
    image: "/plum-blossoms-painting.png",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "Arriving in Aotearoa",
    author: "James Patel",
    category: "Migration",
    emotion: "first time",
    image: "/new-zealand-arrival-artistic.png",
    likes: 31,
    comments: 12,
  },
  {
    id: 3,
    title: "Making Noodles Together",
    author: "Maria Chen",
    category: "Food",
    emotion: "love",
    image: "/grandmother-child-noodles.png",
    likes: 18,
    comments: 5,
  },
  {
    id: 4,
    title: "Walking to School in the Rain",
    author: "David Wong",
    category: "Family",
    emotion: "childhood",
    image: "/watercolor-rainy-school-walk.png",
    likes: 42,
    comments: 15,
  },
]

function ExploreScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Family", "Migration", "Food", "Daily Life", "Adventure", "Romance", "Mystery"]

  const filteredStories =
    activeCategory === "All" ? communityStories : communityStories.filter((story) => story.category === activeCategory)

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Stories</h2>
            <p className="text-gray-600">Discover amazing stories brought to life with AI-generated images</p>
          </div>

          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors font-medium ${
                  activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {story.emotion}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-sm text-white/80 mb-3">by {story.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{story.comments}</span>
                      </button>
                    </div>
                    <button className="hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CreateStoryScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [isRecording, setIsRecording] = useState(false)
  const [creationMode, setCreationMode] = useState<"choose" | "record" | "type">("choose")
  const [storyText, setStoryText] = useState("")

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <button
          onClick={() => onNavigate("home")}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        {creationMode === "choose" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Your Story</h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tell me about your story</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Share your memories and experiences.</p>
            </div>

            <div className="flex gap-6 justify-center">
              <button
                className="flex flex-col items-center gap-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => setCreationMode("record")}
              >
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Record Your Story</h3>
                  <p className="text-gray-600 text-sm">Speak naturally and let us capture your voice</p>
                </div>
              </button>

              <button
                className="flex flex-col items-center gap-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => setCreationMode("type")}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Write Your Story</h3>
                  <p className="text-gray-600 text-sm">Type out your story at your own pace</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {creationMode === "record" && (
          <div>
            <button
              onClick={() => setCreationMode("choose")}
              className="absolute top-20 left-8 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="mb-8">
              <h1
                className={`text-2xl font-semibold mb-8 transition-all duration-500 ${
                  isRecording ? "animate-pulse text-purple-600" : "text-gray-800"
                }`}
              >
                {isRecording ? "I'm listening..." : "Ready to record"}
              </h1>
            </div>

            <div className="relative">
              <button
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-purple-500 hover:bg-purple-600"
                }`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className="w-8 h-8 text-white" />
              </button>

              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-red-300 animate-ping opacity-30" />
                </div>
              )}
            </div>

            {isRecording && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-purple-400 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 40 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {creationMode === "type" && (
          <div>
            <button
              onClick={() => setCreationMode("choose")}
              className="absolute top-20 left-8 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <h1 className="text-2xl font-semibold mb-8 text-gray-800">Write Your Story</h1>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg text-left">
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Start writing your story here..."
                className="w-full h-64 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{storyText.length} characters</span>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">Save Story</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Activity Feed</h1>
          <p className="text-gray-600">Stay updated with your family's story sharing</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">
                  <span className="font-semibold">Sarah Kim</span> liked your story "Grandfather's Painting"
                </p>
                <p className="text-sm text-gray-600 mb-3">2 hours ago</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">"Such a beautiful memory! My grandfather was also an artist."</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">
                  <span className="font-semibold">James Patel</span> commented on "Family Dinner Traditions"
                </p>
                <p className="text-sm text-gray-600 mb-3">5 hours ago</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    "This reminds me of our Sunday gatherings. Thank you for sharing!"
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">
                  <span className="font-semibold">Maria Chen</span> shared a new story "Making Noodles Together"
                </p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ProfileScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-8">
          {/* Profile sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">LH</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Li Hua</h2>
                <p className="text-gray-600">lihua@memoryecho.com</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">28</div>
                  <div className="text-sm text-gray-600">Memories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">76</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">112</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">My Stories</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Collections</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => onNavigate("verification")}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Verify Identity</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      Your story "Grandfather's Painting" received 12 new likes
                    </p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">New comment on "Family Dinner Traditions"</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VerificationScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md mx-auto text-center">
        <button
          onClick={() => onNavigate("profile")}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-6 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Identity</h1>
          <p className="text-gray-600 mb-8">
            Help us keep MemoryEcho safe by verifying your identity. This helps build trust in our community.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span className="text-gray-700">Email verified</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">!</span>
              </div>
              <span className="text-gray-700">Phone verification pending</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold">
            Continue Verification
          </Button>
        </div>
      </div>
    </div>
  )
}

function MyStoriesScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [privacyFilter, setPrivacyFilter] = useState<"All" | "Public" | "Private">("All")

  const categories = ["All", "Family", "Migration", "Food", "Daily Life", "Adventure", "Romance", "Mystery"]

  const myStories = [
    {
      id: 1,
      title: "My Secret Garden",
      author: "You",
      image: "/secret-garden.png",
      tag: "secret",
      likes: 0,
      comments: 0,
      category: "Daily Life",
      isPrivate: true,
    },
    {
      id: 2,
      title: "The Letter I Never Sent",
      author: "You",
      image: "/autumn-forest-path.png",
      tag: "emotion",
      likes: 0,
      comments: 0,
      category: "Romance",
      isPrivate: false,
    },
  ]

  const filteredStories = myStories.filter((story) => {
    const categoryMatch = selectedCategory === "All" || story.category === selectedCategory
    const privacyMatch =
      privacyFilter === "All" ||
      (privacyFilter === "Private" && story.isPrivate) ||
      (privacyFilter === "Public" && !story.isPrivate)
    return categoryMatch && privacyMatch
  })

  return (
    <main className="flex-1 max-w-7xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">My Stories</h2>
        <p className="text-gray-600 text-lg">Your personal collection of stories and generated images</p>
      </div>

      <div className="flex gap-3 mb-6">
        {(["All", "Public", "Private"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setPrivacyFilter(filter)}
            className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${
              privacyFilter === filter
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  {story.isPrivate ? (
                    <div className="bg-red-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Private
                    </div>
                  ) : (
                    <div className="bg-green-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      Public
                    </div>
                  )}
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {story.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                  <p className="text-gray-200 text-sm mb-3">{story.author}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{story.comments}</span>
                      </button>
                    </div>
                    <button className="hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
          <p className="text-gray-600 mb-6">Start creating your first story to see it here</p>
          <button
            onClick={() => onNavigate("create")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Your First Story
          </button>
        </div>
      )}
    </main>
  )
}

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                MemoryEcho
              </h1>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-8">
              <button
                className={`px-4 py-2 text-lg font-medium transition-colors relative ${
                  currentScreen === "home" ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => handleNavigate("home")}
              >
                Explore
                {currentScreen === "home" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
              <button
                className={`px-4 py-2 text-lg font-medium transition-colors relative ${
                  currentScreen === "mystories" ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setCurrentScreen("mystories")}
              >
                My Stories
                {currentScreen === "mystories" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Create Story Button and Profile */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentScreen("create")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Story
              </button>
              <button
                onClick={() => handleNavigate("profile")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {currentScreen === "home" && <ExploreScreen onNavigate={handleNavigate} />}
      {currentScreen === "mystories" && <MyStoriesScreen onNavigate={handleNavigate} />}
      {currentScreen === "create" && <CreateStoryScreen onNavigate={handleNavigate} />}
      {currentScreen === "activity" && <ActivityScreen onNavigate={handleNavigate} />}
      {currentScreen === "profile" && <ProfileScreen onNavigate={handleNavigate} />}
      {currentScreen === "verification" && <VerificationScreen onNavigate={handleNavigate} />}
    </div>
  )
}
