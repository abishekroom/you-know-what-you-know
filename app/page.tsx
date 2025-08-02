'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const USELESS_QUESTIONS = [
  "Is it Friday?",
  "Are you wearing socks right now?",
  "Do bananas grow upside down?",
  "Is the number 7 feeling lonely today?",
  "Are you breathing manually now?",
  "Is your left foot jealous of your right foot?",
  "Do you think WiFi can see you?",
  "Is cereal soup?",
  "Are you blinking too much?",
  "Is your phone judging your search history?",
  "Do fish get thirsty?",
  "Are clouds just sky sheep?",
  "Is your shadow following social distancing?",
  "Do elevators get tired of going up and down?",
  "Are you older than you were yesterday?",
  "Is the letter Q useless without U?",
  "Do penguins have knees?",
  "Are you sitting in a chair that's sitting on the floor?",
  "Is pizza a vegetable if it has tomato sauce?",
  "Do your thoughts have an accent?",
  "Is Tuesday the most Tuesday day of the week?",
  "Are you made of star stuff?",
  "Do mirrors work in the dark?",
  "Is silence actually making a sound?",
  "Are you taller lying down?",
  "Do robots dream of electric sheep?",
  "Is your belly button an innie or an outie?",
  "Are you reading this question right now?",
  "Do trees talk when no one's listening?",
  "Is chocolate a salad if it comes from a bean?",
  "Does your reflection get tired of copying you?",
  "Are you disappointed in your past self?",
  "Do crabs think fish are flying?",
  "Is the alphabet in the right order?",
  "Are you procrastinating right now?",
  "Do you think about your breathing when no one mentions it?",
  "Is water wet or does it make things wet?",
  "Do blind people see in their dreams?",
  "Are you manually controlling your heartbeat?",
  "Is today's you smarter than yesterday's you?",
  "Do plants get embarrassed when they're naked in winter?",
  "Are you reading this with your internal voice?",
  "Do atoms know they exist?",
  "Is your life just a simulation running on someone's phone?",
  "Are you the main character in your story?",
  "Do escalators feel dizzy?",
  "Is the word 'abbreviation' too long?",
  "Are you overthinking this question?",
  "Do microwaves judge your late-night snack choices?",
  "Is your Wi-Fi password judging you?",
  "Are you suspicious of your own shadow?",
  "Do calculators feel insecure around mathematicians?",
  "Is your bed jealous of your couch?",
  "Are you wearing your lucky underwear?",
  "Do you think your pet secretly judges your life choices?",
  "Is your favorite color disappointed in your wardrobe?",
  "Are you manually keeping your eyes moist right now?",
  "Do you think clouds have anxiety about their shape?",
  "Is your browser history proud of you?",
  "Are you suddenly aware of your tongue's position?",
  "Do you trust your autopilot brain while walking?",
  "Is your reflection more attractive than you?",
  "Are you afraid of your own potential?",
  "Do you think your phone knows your darkest secrets?",
  "Is your inner child disappointed in your breakfast choices?",
  "Are you breathing through your nose or mouth right now?",
  "Do you think your car misses you when you're away?",
  "Is your procrastination procrastinating?",
  "Are you consciously deciding to read each word?",
  "Do you think your GPS judges your driving?",
  "Is your future self proud of what you're doing right now?",
  "Are you manually producing saliva?",
  "Do you think aliens would find humans cute like we find cats cute?",
  "Is your sleep schedule offended by your life choices?",
  "Are you suddenly aware of the weight of your arms?",
  "Do you think your apps gossip about your usage patterns?",
  "Is your consciousness just a very persistent illusion?",
  "Are you thinking about thinking about thinking?",
  "Do you trust your memory of this morning?",
  "Is your anxiety anxious about being anxious?",
  "Are you performing 'being normal' for invisible judges?",
  "Do you think your smart home devices are plotting against you?",
  "Is your productivity disappointed in your potential?",
  "Are you suspicious of suspiciously good parking spots?",
  "Do you think your past self would recognize current you?",
  "Is your brain's narrator using your voice or someone else's?"
]

const CATEGORIES = ['Existential', 'Physical', 'Technological', 'Absurd', 'Meta', 'Paranoid']

const ACHIEVEMENTS = [
  { id: 'first_question', name: 'First Victim', description: 'Asked your first pointless question', threshold: 1 },
  { id: 'curious_george', name: 'Curious George', description: 'Asked 10 pointless questions', threshold: 10 },
  { id: 'time_waster', name: 'Time Waster', description: 'Asked 25 pointless questions', threshold: 25 },
  { id: 'existential_crisis', name: 'Existential Crisis', description: 'Asked 50 pointless questions', threshold: 50 },
  { id: 'philosopher', name: 'Philosopher', description: 'Asked 100 pointless questions', threshold: 100 },
  { id: 'enlightened', name: 'Enlightened Being', description: 'Asked 200 pointless questions', threshold: 200 }
]

export default function UselessQuestionsApp() {
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentCategory, setCurrentCategory] = useState("")
  const [answer, setAnswer] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [isRevealing, setIsRevealing] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [showStats, setShowStats] = useState(false)
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [newAchievement, setNewAchievement] = useState(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [sessionStart] = useState(Date.now())
  const [questionHistory, setQuestionHistory] = useState([])

  const questionRef = useRef(null)
  const answerRef = useRef(null)
  const buttonsRef = useRef(null)
  const cardRef = useRef(null)
  const statsRef = useRef(null)
  const achievementRef = useRef(null)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - sessionStart) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [sessionStart])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
    script.onload = () => setGsapLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (gsapLoaded && window.gsap) {
      const tl = window.gsap.timeline()
      tl.fromTo(cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }
  }, [gsapLoaded])

  useEffect(() => {
    if (gsapLoaded && window.gsap && currentQuestion && questionRef.current) {
      window.gsap.fromTo(questionRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      )
    }
  }, [currentQuestion, gsapLoaded])

  useEffect(() => {
    if (gsapLoaded && window.gsap && answer && answerRef.current) {
      window.gsap.fromTo(answerRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      )
    }
  }, [answer, gsapLoaded])

  useEffect(() => {
    if (newAchievement && gsapLoaded && window.gsap && achievementRef.current) {
      const tl = window.gsap.timeline()
      tl.fromTo(achievementRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      
      setTimeout(() => {
        window.gsap.to(achievementRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => setNewAchievement(null)
        })
      }, 3000)
    }
  }, [newAchievement, gsapLoaded])

  const getRandomQuestion = () => {
    const availableQuestions = USELESS_QUESTIONS.filter(q => 
      !questionHistory.slice(-5).includes(q)
    )
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const question = availableQuestions[randomIndex]
    
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
    setCurrentCategory(category)
    
    return question
  }

  const getRandomAnswer = () => {
    return Math.random() > 0.5 ? "YES" : "NO"
  }

  const checkAchievements = (count) => {
    const newAchievements = ACHIEVEMENTS.filter(achievement => 
      count >= achievement.threshold && !achievements.includes(achievement.id)
    )
    
    if (newAchievements.length > 0) {
      const latest = newAchievements[newAchievements.length - 1]
      setAchievements(prev => [...prev, latest.id])
      setNewAchievement(latest)
    }
  }

  const generateNewQuestion = () => {
    if (gsapLoaded && window.gsap && questionRef.current) {
      window.gsap.to(questionRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setAnswer("")
          setUserAnswer("")
          setIsRevealing(false)
          const newQuestion = getRandomQuestion()
          setCurrentQuestion(newQuestion)
          setQuestionHistory(prev => [...prev, newQuestion].slice(-10))
        }
      })
    } else {
      setAnswer("")
      setUserAnswer("")
      setIsRevealing(false)
      const newQuestion = getRandomQuestion()
      setCurrentQuestion(newQuestion)
      setQuestionHistory(prev => [...prev, newQuestion].slice(-10))
    }

    if (gsapLoaded && window.gsap && answerRef.current) {
      window.gsap.to(answerRef.current, {
        opacity: 0,
        duration: 0.2
      })
    }
  }

  const handleAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer)
    
    if (gsapLoaded && window.gsap && buttonsRef.current) {
      window.gsap.to(buttonsRef.current, {
        opacity: 0,
        duration: 0.3
      })
    }

    setIsRevealing(true)
    setTimeout(() => {
      const universeAnswer = getRandomAnswer()
      setAnswer(universeAnswer)
      const newCount = questionCount + 1
      setQuestionCount(newCount)
      
      if (selectedAnswer === universeAnswer) {
        setStreak(prev => {
          const newStreak = prev + 1
          setBestStreak(current => Math.max(current, newStreak))
          return newStreak
        })
      } else {
        setStreak(0)
      }
      
      checkAchievements(newCount)
    }, 1000)
  }

  const toggleStats = () => {
    if (gsapLoaded && window.gsap && statsRef.current) {
      if (!showStats) {
        setShowStats(true)
        window.gsap.fromTo(statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        )
      } else {
        window.gsap.to(statsRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => setShowStats(false)
        })
      }
    } else {
      setShowStats(!showStats)
    }
  }

  const resetStats = () => {
    setQuestionCount(0)
    setStreak(0)
    setBestStreak(0)
    setAchievements([])
    setQuestionHistory([])
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressToNextAchievement = () => {
    const nextAchievement = ACHIEVEMENTS.find(a => questionCount < a.threshold && !achievements.includes(a.id))
    if (!nextAchievement) return { progress: 100, next: null }
    return {
      progress: (questionCount / nextAchievement.threshold) * 100,
      next: nextAchievement
    }
  }

  useEffect(() => {
    generateNewQuestion()
  }, [])

  const { progress, next } = getProgressToNextAchievement()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      
      {newAchievement && (
        <div ref={achievementRef} className="fixed top-4 right-4 z-50">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-xl">🏆</div>
                <div>
                  <div className="font-semibold text-amber-900">{newAchievement.name}</div>
                  <div className="text-amber-700 text-sm">{newAchievement.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Utterly Useless Questions
          </h1>
          <p className="text-muted-foreground">
            The most pointless app you'll ever use
          </p>
        
          {next && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Next: {next.name}</span>
                <span>{questionCount}/{next.threshold}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {/* YA BOY DO IT*/}
        <Card ref={cardRef}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="secondary">{currentCategory}</Badge>
              <CardTitle className="text-xl">Question #{questionCount + 1}</CardTitle>
              <Badge variant="outline">{streak > 0 ? `🔥 ${streak}` : ''}</Badge>
            </div>
            <CardDescription>
              What does your wisdom tell you?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            <div ref={questionRef} className="text-center p-6 bg-muted rounded-lg">
              <h2 className="text-lg md:text-xl font-medium leading-relaxed">
                {currentQuestion}
              </h2>
            </div>

            <div className="text-center space-y-4">
              {!answer && !isRevealing && (
                <div ref={buttonsRef} className="flex justify-center gap-4">
                  <Button 
                    onClick={() => handleAnswer('YES')}
                    size="lg"
                    className="px-8"
                  >
                    YES
                  </Button>
                  <Button 
                    onClick={() => handleAnswer('NO')}
                    size="lg"
                    variant="outline"
                    className="px-8"
                  >
                    NO
                  </Button>
                </div>
              )}

              {isRevealing && !answer && (
                <div className="text-muted-foreground">
                  The universe is deciding...
                </div>
              )}

              {answer && (
                <div ref={answerRef} className="space-y-4">
                  <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                    <span>You: <strong>{userAnswer}</strong></span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Universe: <strong>{answer}</strong></span>
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold">
                    {answer}
                  </div>
                  
                  <div className="text-muted-foreground">
                    {userAnswer === answer ? (
                      <span className="text-green-600">The cosmos agrees with you!</span>
                    ) : (
                      <span className="text-red-600">The universe disagrees!</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {answer && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={generateNewQuestion}
                  className="flex-1"
                >
                  Ask Another Question
                </Button>
                <Button 
                  onClick={toggleStats}
                  variant="outline"
                  className="flex-1"
                >
                  {showStats ? 'Hide' : 'Show'} Stats
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {showStats && (
          <Card ref={statsRef}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Statistics
                <Badge variant="secondary">{achievements.length}/{ACHIEVEMENTS.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{questionCount}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{bestStreak}</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{Math.floor(questionCount * 1.3)}</div>
                  <div className="text-sm text-muted-foreground">Brain Cells Lost</div>
                </div>
              </div>


              <div className="space-y-3">
                <h3 className="font-semibold">Achievements</h3>
                <div className="grid gap-3">
                  {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = achievements.includes(achievement.id)
                    return (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border ${
                          isUnlocked 
                            ? 'bg-amber-50 border-amber-200' 
                            : 'bg-muted border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">
                            {isUnlocked ? '🏆' : '🔒'}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${isUnlocked ? 'text-amber-900' : ''}`}>
                              {achievement.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {achievement.description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {isUnlocked ? 'Unlocked!' : `${questionCount}/${achievement.threshold}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Separator />

              <Button 
                onClick={resetStats}
                variant="destructive"
                className="w-full"
              >
                Reset All Progress
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-muted-foreground text-sm space-y-1">
          <p>Congratulations! You&apos;re using the most pointless app ever created.</p>
          <p>No refunds for time wasted.</p>
        </div>
      </div>
    </div>
  )
}