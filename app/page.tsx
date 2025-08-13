"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ArrowLeft,
  Plus,
  Camera,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Lock,
  Globe,
  Users,
  ChevronRight,
  X,
  Calendar,
  Tag,
  User,
  Mic,
  Square,
  Shield,
  Bell,
  AlertTriangle,
  Settings,
  Trash2,
  Eye,
  BookOpen,
  Printer,
} from "lucide-react"
// Fixed import path for Header component
import Header from "@/components/Header"

// Define all screen components inline instead of importing from separate files
const ExploreScreen = ({ onStoryClick }: { onStoryClick: (story: any) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const stories = [
    {
      id: 1,
      title: "Under the Plum Tree",
      author: "Maria Chen",
      image: "/plum-blossoms-painting.png",
      tag: "nostalgia",
      likes: 24,
      comments: 8,
      category: "Family",
    },
    {
      id: 2,
      title: "Arriving in Aotearoa",
      author: "James Wilson",
      image: "/new-zealand-arrival-artistic.png",
      tag: "first time",
      likes: 31,
      comments: 12,
      category: "Migration",
    },
    {
      id: 3,
      title: "Making Noodles Together",
      author: "Li Wei",
      image: "/grandmother-child-noodles.png",
      tag: "love",
      likes: 45,
      comments: 15,
      category: "Food",
    },
    {
      id: 4,
      title: "Walking to School in the Rain",
      author: "Sarah Johnson",
      image: "/watercolor-rainy-school-walk.png",
      tag: "adventure",
      likes: 18,
      comments: 6,
      category: "Daily Life",
    },
  ]

  const categories = ["All", "Family", "Migration", "Food", "Daily Life", "Adventure", "Romance", "Mystery"]

  const filteredStories =
    selectedCategory === "All" ? stories : stories.filter((story) => story.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Stories</h1>
        <p className="text-xl text-gray-600">Discover amazing stories brought to life with AI-generated images</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="relative h-80">
              <img
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {story.tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-white/90 text-sm mb-3">{story.author}</p>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{story.comments}</span>
                  </div>
                  <Bookmark className="w-4 h-4 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MyStoriesScreen = ({ onStoryClick }: { onStoryClick: (story: any) => void }) => {
  const [privacyFilter, setPrivacyFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [sortBy, setSortBy] = useState("Most Recent")
  const [showBookletModal, setShowBookletModal] = useState(false)
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [bookletFormat, setBookletFormat] = useState("Standard")
  const [bookletSize, setBookletSize] = useState("A4")

  const myStories = [
    {
      id: 1,
      title: "My Secret Garden",
      author: "You",
      image: "/secret-garden.png",
      tag: "secret",
      likes: 0,
      comments: 0,
      privacy: "Private",
      category: "Family",
      date: "2024/1/12",
    },
    {
      id: 2,
      title: "The Letter I Never Sent",
      author: "You",
      image: "/autumn-forest-path.png",
      tag: "emotion",
      likes: 0,
      comments: 0,
      privacy: "Public",
      category: "Family",
      date: "2024/1/10",
    },
    {
      id: 3,
      title: "Family Reunion Memories",
      author: "You",
      image: "/chinese-new-year-family.png",
      tag: "celebration",
      likes: 5,
      comments: 2,
      privacy: "Collaborative",
      category: "Family",
      date: "2024/1/8",
    },
    {
      id: 4,
      title: "Weekend Adventures",
      author: "You",
      image: "/sunset-beach-generations.png",
      tag: "adventure",
      likes: 3,
      comments: 1,
      privacy: "Collaborative",
      category: "Adventure",
      date: "2024/1/5",
    },
  ]

  const privacyOptions = ["All", "Public", "Private", "Collaborative"]
  const regularCategories = [
    "All Categories",
    "Family",
    "Migration",
    "Food",
    "Daily Life",
    "Adventure",
    "Romance",
    "Mystery",
  ]
  const collaborativeCategories = ["All Categories", "Family", "Friends"]

  const currentCategories = privacyFilter === "Collaborative" ? collaborativeCategories : regularCategories

  const filteredStories = myStories.filter((story) => {
    const matchesPrivacy = privacyFilter === "All" || story.privacy === privacyFilter
    const matchesCategory = categoryFilter === "All Categories" || story.category === categoryFilter
    return matchesPrivacy && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Stories</h1>
        <button
          onClick={() => setShowBookletModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          Create Booklet
        </button>
      </div>

      {/* Privacy Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {privacyOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setPrivacyFilter(option)
              setCategoryFilter("All Categories")
            }}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              privacyFilter === option
                ? "bg-orange-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-4 mb-8">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          {currentCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="Most Recent">Most Recent</option>
          <option value="Most Popular">Most Popular</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="relative h-64">
              <img
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Privacy Badge */}
              <div className="absolute top-3 right-3">
                {story.privacy === "Private" && (
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Private
                  </div>
                )}
                {story.privacy === "Public" && (
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Public
                  </div>
                )}
                {story.privacy === "Collaborative" && (
                  <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Collaborative
                  </div>
                )}
              </div>

              {/* Story Tag */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  {story.tag}
                </span>
              </div>

              {/* Story Info */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-lg font-bold mb-1">{story.title}</h3>
                <p className="text-white/90 text-sm mb-2">{story.author}</p>
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{story.comments}</span>
                    </div>
                  </div>
                  <Bookmark className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No stories found matching your filters.</p>
        </div>
      )}

      {showBookletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Story Booklet</h2>
                <button onClick={() => setShowBookletModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Story Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Select Story</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {myStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedStory?.id === story.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium">{story.title}</h4>
                          <p className="text-sm text-gray-500">{story.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booklet Format Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Booklet Format</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Standard", "Premium", "Photo Book", "Minimalist"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setBookletFormat(format)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        bookletFormat === format
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium">{format}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {format === "Standard" && "Classic layout with text and images"}
                        {format === "Premium" && "Enhanced design with decorative elements"}
                        {format === "Photo Book" && "Image-focused with minimal text"}
                        {format === "Minimalist" && "Clean, simple typography"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Size & Format</h3>
                <div className="flex gap-3">
                  {["A4", "A5", "Letter", "Square"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setBookletSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        bookletSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    if (selectedStory) {
                      alert(
                        `Creating ${bookletFormat} booklet for "${selectedStory.title}" in ${bookletSize} format...`,
                      )
                      setShowBookletModal(false)
                    }
                  }}
                  disabled={!selectedStory}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  Create & Print Booklet
                </button>
                <button
                  onClick={() => {
                    if (selectedStory) {
                      alert(`Previewing ${bookletFormat} booklet for "${selectedStory.title}"...`)
                    }
                  }}
                  disabled={!selectedStory}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ActivityScreen = ({ onBack }: { onBack: () => void }) => {
  const activities = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      action: "shared 5 new photos from their trip to Japan",
      time: "2h ago",
      likes: 24,
      comments: 8,
      type: "photos",
    },
    {
      id: 2,
      user: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      action: "created a new story 'Wedding Season 2024'",
      time: "4h ago",
      likes: 18,
      comments: 3,
      type: "story",
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      action: "added photos to 'Family Traditions' collection",
      time: "6h ago",
      likes: 12,
      comments: 2,
      type: "collection",
      images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Activity</h1>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex gap-4">
                <img
                  src={activity.avatar || "/placeholder.svg"}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600 ml-1">{activity.action}</span>
                  </div>

                  {activity.type === "collection" && activity.images && (
                    <div className="flex gap-2 mb-4">
                      {activity.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt="Collection preview"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{activity.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{activity.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="ml-auto">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value="john"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value="john@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value="Memory collector and storyteller"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  readOnly
                />
              </div>

              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Privacy & Security */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Privacy & Security</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                Your profile is currently public. Other users can view your photos and follow you.
              </p>
              <button className="text-sm text-gray-500 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Privacy Settings (Coming Soon)
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">Manage your notification preferences.</p>
              <button className="text-sm text-gray-500 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notification Settings (Coming Soon)
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
            </div>

            <div className="border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <div className="pt-4 border-t border-gray-200">
            <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileScreen = ({
  onCollectionsClick,
  onActivityClick,
  onSettingsClick,
}: {
  onCollectionsClick: () => void
  onActivityClick: () => void
  onSettingsClick: () => void
}) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [followersModalType, setFollowersModalType] = useState<"followers" | "following">("followers")

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">John</h2>
          <p className="text-gray-600 mb-4">Memory collector and story teller</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Stats */}
        <div className="px-8 pb-6">
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Memories</div>
            </div>
            <div
              className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => {
                setFollowersModalType("followers")
                setShowFollowersModal(true)
              }}
            >
              <div className="text-2xl font-bold text-gray-900">76</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div
              className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => {
                setFollowersModalType("following")
                setShowFollowersModal(true)
              }}
            >
              <div className="text-2xl font-bold text-gray-900">112</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="border-t border-gray-100">
          <button
            onClick={onCollectionsClick}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Collections</div>
                <div className="text-sm text-gray-600">Organize photos into collections</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={onActivityClick}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Activity Feed</div>
                <div className="text-sm text-gray-600">See what people you follow are sharing</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={onSettingsClick}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-600">Account and privacy settings</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Sign Out */}
        <div className="border-t border-gray-100 p-6">
          <button className="text-red-600 hover:text-red-700 font-medium transition-colors">Sign Out</button>
        </div>
      </div>

      {/* Followers/Following Modal */}
      {showFollowersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {followersModalType === "followers" ? "Followers" : "Following"}
              </h2>
              <button
                onClick={() => setShowFollowersModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[60vh]">
              {followersModalType === "followers" ? (
                // Followers List
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">SC</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Sarah Chen</div>
                        <div className="text-sm text-gray-500">sarah@memoryecho.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                      Unfollow
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">MJ</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Marcus Johnson</div>
                        <div className="text-sm text-gray-500">marcus@example.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                      Follow
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">DK</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">David Kim</div>
                        <div className="text-sm text-gray-500">david@example.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                      Unfollow
                    </button>
                  </div>
                </div>
              ) : (
                // Following List
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">ER</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Emma Rodriguez</div>
                        <div className="text-sm text-gray-500">emma@memoryecho.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                      Unfollow
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">AL</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Alex Liu</div>
                        <div className="text-sm text-gray-500">alex@example.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                      Unfollow
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">JW</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Jessica Wang</div>
                        <div className="text-sm text-gray-500">jessica@memoryecho.com</div>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                      Unfollow
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const StoryCreationScreen = ({
  onBack,
  onContinueToSettings,
}: { onBack: () => void; onContinueToSettings: () => void }) => {
  const [mode, setMode] = useState<"choose" | "write" | "record" | "enhance">("choose")
  const [storyText, setStoryText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [enhancedStory, setEnhancedStory] = useState("")
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ role: "ai" | "user"; message: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const [showImageModal, setShowImageModal] = useState(false)

  const [aiQuestions, setAiQuestions] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [questionTransition, setQuestionTransition] = useState(false)
  const [firstSentenceCompleted, setFirstSentenceCompleted] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(
    "Every memory has the power to inspire, connect, and heal. What story will you share today?",
  )

  const categoryPrompts = {
    Family: "Share a cherished family memory that brings you joy",
    Adventure: "Tell us about an adventure that changed your perspective",
    Food: "Describe a meal or recipe that holds special meaning",
    Romance: "Share a moment of love that touched your heart",
    Tradition: "Tell us about a tradition that connects you to your roots",
    Mystery: "Recall an unexplained moment that still intrigues you",
    Wisdom: "Share a lesson learned that shaped who you are today",
    Memories: "What memory do you find yourself returning to again and again?",
  }

  const handleCategoryClick = (category: string) => {
    console.log("Button clicked:", category)
    setCurrentQuestion(categoryPrompts[category as keyof typeof categoryPrompts] || currentQuestion)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const animateToNextQuestion = useCallback((newQuestion: string) => {
    setQuestionTransition(true)
    setTimeout(() => {
      setCurrentQuestion(newQuestion)
      setQuestionTransition(false)
    }, 300)
  }, [])

  const analyzeStoryAndGenerateQuestions = useCallback(
    async (text: string) => {
      if (text.length < 50) return // Wait for meaningful content

      setIsAnalyzing(true)

      try {
        const response = await fetch("/api/analyze-story", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storyText: text }),
        })

        const data = await response.json()

        if (data.success && data.questions.length > 0) {
          setAiQuestions(data.questions)
          if (firstSentenceCompleted) {
            animateToNextQuestion(data.questions[0])
          }
        }
      } catch (error) {
        console.error("Story analysis error:", error)
      } finally {
        setIsAnalyzing(false)
      }
    },
    [animateToNextQuestion, firstSentenceCompleted],
  )

  useEffect(() => {
    if (mode === "write" && storyText.trim()) {
      console.log("Story text changed:", storyText)
      console.log("First sentence completed:", firstSentenceCompleted)

      const hasFirstSentence = /[.!?]/.test(storyText)
      console.log("Has first sentence:", hasFirstSentence)

      if (hasFirstSentence && !firstSentenceCompleted) {
        console.log("Triggering first sentence analysis")
        setFirstSentenceCompleted(true)
        // Trigger immediate analysis for first sentence
        analyzeStoryAndGenerateQuestions(storyText)
      } else if (firstSentenceCompleted) {
        // Continue analyzing on every change after first sentence
        analyzeStoryAndGenerateQuestions(storyText)
      }
    }
  }, [storyText, mode, firstSentenceCompleted, analyzeStoryAndGenerateQuestions])

  useEffect(() => {
    console.log("AI Questions updated:", aiQuestions)
    console.log("First sentence completed:", firstSentenceCompleted)

    if (aiQuestions.length > 0 && firstSentenceCompleted) {
      // Show first question immediately after first sentence
      const initialTimeout = setTimeout(() => {
        console.log("Showing first AI question")
        animateToNextQuestion(aiQuestions[0])
        setCurrentQuestionIndex(0)
      }, 1000) // Small delay to ensure smooth transition

      // Then rotate questions every 30 seconds
      const interval = setInterval(() => {
        setCurrentQuestionIndex((prev) => {
          const nextIndex = (prev + 1) % aiQuestions.length
          console.log("Rotating to question:", nextIndex)
          animateToNextQuestion(aiQuestions[nextIndex])
          return nextIndex
        })
      }, 30000)

      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [aiQuestions, firstSentenceCompleted, animateToNextQuestion])

  const startAiGuidance = async () => {
    setChatStarted(true)
    setIsAiThinking(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const initialMessage = `I've read your story and I think it has great potential! Let me help you make it even more engaging. 

What specific moment in your story felt most important to you? I'd love to help you bring out more details about that part.`

    setAiChatMessages([{ role: "ai", message: initialMessage }])
    setIsAiThinking(false)
  }

  const sendMessageToAi = async () => {
    if (!userInput.trim()) return

    const newMessages = [...aiChatMessages, { role: "user" as const, message: userInput }]
    setAiChatMessages(newMessages)
    setUserInput("")
    setIsAiThinking(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const responses = [
      "That's a beautiful detail! Can you tell me more about what you were feeling in that moment? Adding emotions helps readers connect with your story.",
      "Interesting! What did you see, hear, or smell during that experience? Sensory details make stories come alive.",
      "That sounds meaningful. Who else was there with you? How did they react or what did they say?",
      "Great insight! What happened right before this moment? Sometimes the buildup makes the main event even more powerful.",
      "I love that perspective! What would you tell someone else who went through something similar? That wisdom could be a beautiful ending.",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    setAiChatMessages([...newMessages, { role: "ai", message: randomResponse }])
    setIsAiThinking(false)
  }

  const generateStoryImage = async () => {
    setIsGeneratingImage(true)
    console.log("Starting image generation...")

    try {
      const storyPrompt = storyText.slice(0, 300) || "A meaningful personal memory"

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Illustrate this memory: ${storyPrompt}`,
          storyContent: storyText,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Image generation response:", data)

      if (data.success) {
        setGeneratedImage(data.imageUrl)
        setShowImageModal(true)

        if (data.isPlaceholder) {
          console.log("Using placeholder image:", data.message)
        } else {
          console.log("AI image generated successfully!")
        }
      } else {
        throw new Error(data.error || "Image generation failed")
      }
    } catch (error) {
      console.error("Image generation error:", error)

      const fallbackImage = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent("Story Memory Illustration - " + (storyText.slice(0, 50) || "Personal Memory"))}`
      setGeneratedImage(fallbackImage)
      setShowImageModal(true)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <button
          onClick={() => handleCategoryClick("Family")}
          className="absolute top-16 left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Family
        </button>

        <button
          onClick={() => handleCategoryClick("Adventure")}
          className="absolute top-32 left-16 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Adventure
        </button>

        <button
          onClick={() => handleCategoryClick("Food")}
          className="absolute bottom-32 left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Food
        </button>

        <button
          onClick={() => handleCategoryClick("Romance")}
          className="absolute top-24 right-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Romance
        </button>

        <button
          onClick={() => handleCategoryClick("Tradition")}
          className="absolute top-40 right-16 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Tradition
        </button>

        <button
          onClick={() => handleCategoryClick("Wisdom")}
          className="absolute bottom-24 right-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Wisdom
        </button>

        <button
          onClick={() => handleCategoryClick("Memories")}
          className="absolute bottom-16 left-24 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Memories
        </button>

        <button
          onClick={() => handleCategoryClick("Mystery")}
          className="absolute bottom-40 right-24 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer z-10 shadow-lg"
        >
          Mystery
        </button>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-16 py-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight cursor-pointer hover:text-white/90 transition-colors"
            onClick={() =>
              setCurrentQuestion(
                "Every memory has the power to inspire, connect, and heal. What story will you share today?",
              )
            }
          >
            {currentQuestion ===
            "Every memory has the power to inspire, connect, and heal. What story will you share today?"
              ? "Tell Your Story"
              : "Your Story Prompt"}
          </h1>

          <div className="mb-12">
            <p
              className={`text-white/80 text-xl md:text-2xl leading-relaxed transition-all duration-300 ${questionTransition ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"}`}
            >
              {currentQuestion}
            </p>
          </div>

          {mode === "choose" && (
            <div className="flex items-center gap-6 justify-center">
              <button
                onClick={() => setMode("write")}
                className="bg-white text-orange-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-50 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <span>✏️</span>
                Write Your Story
              </button>

              <span className="text-white/60 text-lg font-medium">or</span>

              <button
                onClick={() => setMode("record")}
                className="bg-orange-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <span>🎤</span>
                Record Your Story
              </button>
            </div>
          )}

          {mode === "write" && (
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-400/50 max-w-4xl mx-auto">
              <div className="flex-1">
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Share your story here..."
                  className="w-full h-32 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent text-sm"
                />

                {isAnalyzing && (
                  <div className="flex items-center gap-2 mt-2 text-white/60 text-xs">
                    <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin"></div>
                    AI is reading your story...
                  </div>
                )}

                <div className="flex justify-between items-center mt-3">
                  <div className="text-white/60 text-xs">{storyText.length} characters</div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setMode("choose")
                        setStoryText("")
                        setAiQuestions([])
                        setCurrentQuestion(
                          "Every memory has the power to inspire, connect, and heal. What story will you share today?",
                        )
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (storyText.trim()) {
                          generateStoryImage()
                        }
                      }}
                      disabled={!storyText.trim() || isGeneratingImage}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGeneratingImage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Image...
                        </>
                      ) : (
                        <>🎨 Generate Image</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "record" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                <div className="space-y-6">
                  <div className="text-white/80 text-lg">
                    {isRecording ? "Recording..." : hasRecording ? "Recording Complete" : "Ready to Record"}
                  </div>

                  {isRecording && (
                    <div className="text-3xl font-mono text-white">
                      {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        if (isRecording) {
                          setIsRecording(false)
                          setHasRecording(true)
                        } else {
                          setIsRecording(true)
                          setRecordingTime(0)
                        }
                      }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {isRecording ? (
                        <Square className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-red-500" />
                      )}
                    </button>
                  </div>

                  {hasRecording && (
                    <div className="space-y-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            setHasRecording(false)
                            setRecordingTime(0)
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300"
                        >
                          Re-record
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={() => {
                        setMode("choose")
                        setHasRecording(false)
                        setIsRecording(false)
                        setRecordingTime(0)
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (hasRecording) {
                          generateStoryImage()
                        }
                      }}
                      disabled={!hasRecording || isGeneratingImage}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGeneratingImage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Image...
                        </>
                      ) : (
                        <>🖼️ Generate Image</>
                      )}
                    </button>
                  </div>

                  {generatedImage && (
                    <div className="mt-4 bg-white/5 rounded-lg p-4 border border-white/10">
                      <img
                        src={generatedImage || "/placeholder.svg"}
                        alt="AI-generated story illustration"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <p className="text-xs text-white/70 mt-2 text-center">Generated image based on your story</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {mode === "enhance" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">✨ Enhance Your Story</h2>
                  <p className="text-white/80">Let AI help you add more depth and detail to your memory</p>
                </div>

                {isGeneratingAI ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
                    <p className="text-white/80">AI is analyzing your story...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {aiSuggestions.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">💡 AI Suggestions to Enrich Your Story:</h3>
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-white/90 text-sm">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {enhancedStory && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">✨ Enhanced Story Preview:</h3>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-h-40 overflow-y-auto">
                          <p className="text-white/90 text-sm whitespace-pre-wrap">{enhancedStory}</p>
                        </div>
                        <button
                          onClick={() => setStoryText(enhancedStory)}
                          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300"
                        >
                          Use Enhanced Version
                        </button>
                      </div>
                    )}

                    {!chatStarted ? (
                      <div className="text-center space-y-4">
                        <h3 className="text-lg font-semibold text-white">🤖 Get AI Writing Guidance</h3>
                        <p className="text-white/80 text-sm">
                          Let our AI guide you through improving your story with thoughtful questions and suggestions.
                        </p>
                        <button
                          onClick={startAiGuidance}
                          disabled={isAiThinking}
                          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
                        >
                          {isAiThinking ? "Starting..." : "Start AI Guidance"}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">💬 AI Writing Coach</h3>

                        {/* Chat Messages */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-h-60 overflow-y-auto space-y-3">
                          {aiChatMessages.map((msg, index) => (
                            <div
                              key={index}
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  msg.role === "user" ? "bg-orange-600 text-white" : "bg-white/10 text-white/90"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            </div>
                          ))}

                          {isAiThinking && (
                            <div className="flex justify-start">
                              <div className="bg-white/10 text-white/90 p-3 rounded-lg">
                                <p className="text-sm">AI is thinking...</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* User Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessageToAi()}
                            placeholder="Share your thoughts or ask for guidance..."
                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2
 focus:ring-orange-500"
                          />
                          <button
                            onClick={sendMessageToAi}
                            disabled={isAiThinking || !userInput.trim()}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                          >
                            Send
                          </button>
                        </div>

                        <div className="border-t border-white/10 pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white/90">Visual Enhancement</h4>
                            {/* Updated AI chat visual button */}
                            <button
                              onClick={generateStoryImage}
                              disabled={isGeneratingImage || !storyText.trim()}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                            >
                              {isGeneratingImage ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Generating...
                                </>
                              ) : (
                                <>🖼️ Generate Image</>
                              )}
                            </button>
                          </div>

                          {generatedImage && (
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <div className="relative group">
                                <img
                                  src={generatedImage || "/placeholder.svg"}
                                  alt="AI-generated story illustration"
                                  className="w-full h-56 object-cover rounded-lg mb-3 transition-transform group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors"></div>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-white/70">
                                  AI-generated illustration based on your story and our conversation
                                </p>
                                <button
                                  onClick={() => setGeneratedImage(null)}
                                  className="text-xs text-white/50 hover:text-white/80 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={() => setMode(hasRecording ? "record" : "write")}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300"
                      >
                        ← Back to Edit
                      </button>
                      <button
                        onClick={onContinueToSettings}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300"
                      >
                        Continue to Publish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showImageModal && generatedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Your Story Illustration</h3>
                <button onClick={() => setShowImageModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated story illustration"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowImageModal(false)
                    onContinueToSettings()
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Continue to Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const StorySettingsScreen = ({ onBack }: { onBack: () => void }) => {
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCollaborative, setIsCollaborative] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const predefinedTags = ["nostalgia", "family", "childhood", "love", "tradition", "wisdom", "art", "memories"]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📖</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Story Settings</h2>
            <p className="text-gray-600">Customize how your memory is shared</p>
          </div>

          {/* Privacy Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
                  <p className="text-gray-600 text-sm">Everyone can see this</p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivate(!isPrivate)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !isPrivate ? "bg-orange-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    !isPrivate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Collaborative Memory Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Collaborative Memory</h3>
                  <p className="text-gray-600 text-sm">Share with a group</p>
                </div>
              </div>
              <button
                onClick={() => setIsCollaborative(!isCollaborative)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isCollaborative ? "bg-orange-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isCollaborative ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>

            {/* Predefined Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom tag"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomTag()}
              />
              <button
                onClick={handleAddCustomTag}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Publish Button */}
          <button
            onClick={onBack}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}

const StoryDetailModal = ({ story, onClose }: { story: any; onClose: () => void }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      setScrollY(target.scrollTop)
    }

    const modalContent = document.getElementById("modal-content")
    if (modalContent) {
      modalContent.addEventListener("scroll", handleScroll)
      return () => modalContent.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const imageHeight = Math.max(200, 400 - scrollY * 0.8)
  const imageScale = Math.max(0.8, 1 - scrollY * 0.0005)
  const isMinimized = scrollY > 100

  const storyContent = {
    "My Secret Garden":
      "Behind our old house, there was a forgotten corner where wild roses climbed over a broken fence. I was seven when I first discovered it, pushing through the overgrown grass that tickled my bare legs. The air smelled of honeysuckle and earth after rain.\n\nI made it my secret place. Every afternoon, I would slip away with a book and a handful of crackers, settling into the soft moss beneath the apple tree. The garden seemed to breathe around me – butterflies dancing between the lavender, bees humming their ancient songs.\n\nYears later, when we moved away, I pressed a rose from that garden between the pages of my favorite book. Sometimes I still open it and remember the magic of having a place that was entirely mine.",

    "The Letter I Never Sent":
      "Dear Mom,\n\nIt's been three years since you left us, and I still find myself reaching for the phone to call you when something wonderful happens. Today I got the promotion you always said I deserved, and for a moment, I forgot you wouldn't be there to answer.\n\nI've written this letter a hundred times in my mind, walking through the forest path where we used to collect autumn leaves. The trees are bare now, just like that day when I realized I'd never hear your laugh again.\n\nI want you to know that I'm okay. Dad is learning to cook your recipes, though his attempts at your famous apple pie still make us smile through our tears. Sarah graduated with honors – you would have been so proud. And I finally learned to play that piano piece you loved.\n\nI carry your voice with me everywhere, Mom. In every decision I make, every kindness I show, every moment I choose love over fear. You're not gone – you're just written in a different language now, one that my heart is slowly learning to read.\n\nWith all my love,\nYour daughter",

    "Family Reunion Memories":
      "The kitchen was chaos in the most beautiful way. Aunties bustled around with steaming dishes, their voices rising and falling in Mandarin and English, sometimes both in the same sentence. The smell of dumplings and red-cooked pork filled every corner of Grandma's house.\n\nI was twelve, perched on a stool, watching my cousins fold wontons with the precision of tiny surgeons. Grandma's weathered hands guided mine, showing me how to crimp the edges just so. 'Like this, xiǎo bǎo,' she whispered, her voice warm as jasmine tea.\n\nUncle Chen told the same stories he told every year, his hands painting pictures in the air. The children rolled their eyes, but we all leaned in anyway, hungry for the familiar rhythm of family folklore. Outside, firecrackers popped like distant applause.\n\nThat night, as we sat around the table sharing oranges and laughter, I understood something profound about belonging. We were threads in a tapestry that stretched back generations, each of us carrying forward the colors and patterns of those who came before.",

    "Walking to School in the Rain":
      "The rain turned our neighborhood into a different world. Sarah and I splashed through puddles that reflected the gray sky like scattered mirrors, our yellow raincoats bright against the morning gloom.\n\nWe took the long way to school, as we always did when it rained. Past Mrs. Chen's garden where the roses hung heavy with water droplets, down the alley where cats sheltered under parked cars, their eyes glowing like amber lanterns.\n\nSarah collected things – smooth pebbles, interesting leaves, once a perfect snail shell. I collected moments. The way the rain drummed different songs on different surfaces. The smell of wet earth and blooming jasmine. The comfortable silence between best friends who didn't need words to communicate.\n\nWe were always late on rainy days, but our teacher, Mrs. Rodriguez, never scolded us. She understood that some lessons couldn't be learned from books – that sometimes the most important education happened in the spaces between destinations, in the willingness to get a little wet while discovering the world.",
  }

  const comments = [
    {
      id: 1,
      author: "Emma Chen",
      text: "This brought tears to my eyes. Thank you for sharing such a beautiful memory.",
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "David Kim",
      text: "I had a secret place like this too when I was young. There's something magical about having your own little world.",
      time: "5 hours ago",
    },
    {
      id: 3,
      author: "Maria Santos",
      text: "Your writing is so vivid, I could almost smell the honeysuckle!",
      time: "1 day ago",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className={`sticky top-0 bg-white border-b border-gray-200 transition-all duration-300 ${
            isMinimized ? "py-3" : "py-4"
          }`}
        >
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              {isMinimized && (
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                {isMinimized && <h2 className="font-bold text-gray-900">{story.title}</h2>}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>2024/1/12</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>Migration</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{story.author}</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div id="modal-content" className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Story Image */}
          <div className="relative overflow-hidden transition-all duration-300" style={{ height: `${imageHeight}px` }}>
            <img
              src={story.image || "/placeholder.svg"}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `scale(${imageScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {!isMinimized && (
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-white text-3xl font-bold mb-2">{story.title}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <span>{story.author}</span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-sm">{story.tag}</span>
                </div>
              </div>
            )}
          </div>

          {/* Story Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none mb-8">
              {storyContent[story.title as keyof typeof storyContent]?.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Engagement Buttons */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-200 mb-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isLiked ? "bg-red-50 text-red-600" : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{story.likes + (isLiked ? 1 : 0)}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isSaved ? "bg-orange-50 text-orange-600" : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                <span>Save</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comments</h3>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900 mb-1">{comment.author}</div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{comment.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CollectionsScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Profile</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Collection</span>
          </button>
        </div>

        {/* Create New Collection Section */}
        <div className="mb-8">
          <button className="w-full max-w-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
            <div className="flex items-center justify-center gap-3">
              <Plus className="w-5 h-5" />
              <span>Create New Collection</span>
            </div>
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Family Portraits Collection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="p-6">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img
                  src="/chinese-new-year-family.png"
                  alt="Family Portraits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Family Portraits</h3>
              <p className="text-gray-600 mb-4">Professional and candid family photos</p>
              <div className="flex items-center gap-2 text-orange-600 font-medium">
                <Camera className="w-4 h-4" />
                <span>18 photos</span>
              </div>
            </div>
          </div>

          {/* Travel Adventures Collection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="p-6">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img
                  src="/tropical-beach-palms.png"
                  alt="Travel Adventures"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Travel Adventures</h3>
              <p className="text-gray-600 mb-4">Photos from our trips around the world</p>
              <div className="flex items-center gap-2 text-orange-600 font-medium">
                <Camera className="w-4 h-4" />
                <span>42 photos</span>
              </div>
            </div>
          </div>

          {/* Special Occasions Collection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="p-6">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img
                  src="/sunset-beach-generations.png"
                  alt="Special Occasions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Special Occasions</h3>
              <p className="text-gray-600 mb-4">Birthdays, holidays, and celebrations</p>
              <div className="flex items-center gap-2 text-orange-600 font-medium">
                <Camera className="w-4 h-4" />
                <span>25 photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [activeTab, setActiveTab] = useState("home")
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [showStoryModal, setShowStoryModal] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      setCurrentScreen("home")
    } else if (tab === "mystories") {
      setCurrentScreen("mystories")
    }
  }

  const handleCreateStory = () => {
    setCurrentScreen("create")
  }

  const handleProfileClick = () => {
    setCurrentScreen("profile")
  }

  const handleCollectionsClick = () => {
    setCurrentScreen("collections")
  }

  const handleActivityClick = () => {
    setCurrentScreen("activity")
  }

  const handleSettingsClick = () => {
    setCurrentScreen("settings")
  }

  const handleBackToProfile = () => {
    setCurrentScreen("profile")
  }

  const openStoryModal = (story: any) => {
    setSelectedStory(story)
    setShowStoryModal(true)
  }

  const closeStoryModal = () => {
    setShowStoryModal(false)
    setSelectedStory(null)
  }

  const handleContinueToSettings = () => {
    setCurrentScreen("storysettings")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onCreateStory={handleCreateStory}
        onProfileClick={handleProfileClick}
      />

      {currentScreen === "home" && <ExploreScreen onStoryClick={openStoryModal} />}

      {currentScreen === "mystories" && <MyStoriesScreen onStoryClick={openStoryModal} />}

      {currentScreen === "profile" && (
        <ProfileScreen
          onCollectionsClick={handleCollectionsClick}
          onActivityClick={handleActivityClick}
          onSettingsClick={handleSettingsClick}
        />
      )}

      {currentScreen === "collections" && <CollectionsScreen onBack={handleBackToProfile} />}

      {currentScreen === "activity" && <ActivityScreen onBack={handleBackToProfile} />}

      {currentScreen === "settings" && <SettingsScreen onBack={handleBackToProfile} />}

      {currentScreen === "create" && (
        <StoryCreationScreen onBack={() => setCurrentScreen("home")} onContinueToSettings={handleContinueToSettings} />
      )}

      {currentScreen === "storysettings" && <StorySettingsScreen onBack={() => setCurrentScreen("home")} />}

      {showStoryModal && selectedStory && <StoryDetailModal story={selectedStory} onClose={closeStoryModal} />}
    </div>
  )
}
