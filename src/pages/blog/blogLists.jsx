import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import arrowIcon from "../../assets/logo and icons/arrow-right.png"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import { useEffect, useMemo, useState } from "react"
import { useBlogList } from "../../lib/reuseableEffects"
import { useSelector } from "react-redux"
import Spinner from "../../components/Spinners/spinner";
import { Link } from "react-router-dom";

const BlogList = () => {

  const loading = useSelector((state) => state.user.loading);
  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/"

  const { posts } = useBlogList();
  // console.log(posts)
  const activePosts = posts?.filter(posts => posts.status === "0") || [];

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter states
  const [contentFilters, setContentFilters] = useState({
    all: true,
    news: false,
    events: false,
    announcements: false,
  })

  const [topicFilters, setTopicFilters] = useState({
    all: true,
    parents: false,
    students: false,
    staff: false,
    achievements: false,
  })

  const [dateFilters, setDateFilters] = useState({
    all: true,
    thisTerm: false,
    lastTerm: false,
    twentyFour: false,
    twentyThree: false,
    older: false,
  })

  const handleContentFilter = (key) => {
    if (key === 'all') {
      setContentFilters({ all: true, news: false, events: false, announcements: false })
    } else {
      setContentFilters(prev => ({ ...prev, all: false, [key]: !prev[key] }))
    }
    setCurrentPage(1)
  }

  const handleTopicFilter = (key) => {
    if (key === 'all') {
      setTopicFilters({ all: true, parents: false, students: false, staff: false, achievements: false })
    } else {
      setTopicFilters(prev => ({ ...prev, all: false, [key]: !prev[key] }))
    }
    setCurrentPage(1)
  }

  const handleDateFilter = (key) => {
    if (key === 'all') {
      setDateFilters({ all: true, thisTerm: false, lastTerm: false, twentyFour: false, twentyThree: false, older: false })
    } else {
      setDateFilters(prev => ({ ...prev, all: false, [key]: !prev[key] }))
    }
    setCurrentPage(1)
  }

  // Reset all filters
  const resetFilters = () => {
    setContentFilters({ all: true, news: false, events: false, announcements: false })
    setTopicFilters({ all: true, parents: false, students: false, staff: false, achievements: false })
    setDateFilters({ all: true, thisTerm: false, lastTerm: false, twentyFour: false, twentyThree: false, older: false })
    setCurrentPage(1)
  }

  // Filter blog posts
  // Ensures filters recompute when posts change and guards against malformed data
  const filteredPosts = useMemo(() => {
    if (!Array.isArray(activePosts)) return []
    return activePosts.filter(activePosts => {
      const categoryKey = (activePosts?.category || '').toLowerCase()
      const topicKey = (activePosts?.topic || '').toLowerCase()

      const contentMatch = contentFilters.all || !!contentFilters[categoryKey]
      const topicMatch = topicFilters.all || !!topicFilters[topicKey]

      let dateMatch = dateFilters.all
      if (!dateMatch) {
        const year = Number(activePosts?.year)
        if (dateFilters.twentyFour) dateMatch = dateMatch || year === 2024
        if (dateFilters.twentyThree) dateMatch = dateMatch || year === 2023
        if (dateFilters.older) dateMatch = dateMatch || year < 2023
        if (dateFilters.thisTerm || dateFilters.lastTerm) dateMatch = dateMatch || year === 2025
      }

      return contentMatch && topicMatch && dateMatch
    })
  }, [activePosts, contentFilters, topicFilters, dateFilters])

  // Reset to first page whenever new posts arrive to ensure immediate rendering
  // of the first page after data fetch and on filter reset
  useEffect(() => {
    setCurrentPage(1)
  }, [activePosts])


  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)



    return (
      <div className="py-20 grid gap-10 bg-[#fafafa]">
        <div className="text-center px-4 md:px-[120px] lg:px-[231px]">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">News & Events</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            Latest from Our Blog
          </div>
        </div>
        <div className="px-4 md:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-10">
            <div className="border bg-white lg:col-span-2">
              <span className="p-4 flex justify-between items-center border-b">
                <span className="text-sm">Filter</span>
                <Button variant="outline" size="sm" className="text-xs"  onClick={resetFilters}>
                  Reset
                </Button>
              </span>
              <span className="p-4 grid gap-4 text-sm border-b">
                <span className="font-semibold">By content</span>
                <div className="grid gap-4">
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={contentFilters.all} onCheckedChange={() => handleContentFilter('all')} />
                  <span>All</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={contentFilters.news} onCheckedChange={() => handleContentFilter('news')} />
                  <span>News</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={contentFilters.events} onCheckedChange={() => handleContentFilter('events')} />
                  <span>Events</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={contentFilters.announcements} onCheckedChange={() => handleContentFilter('announcements')} />
                  <span>Announcements</span>
                </label>
              </div>
              </span>
              <span className="p-4 grid gap-4 text-sm border-b">
                <span className="font-semibold">By topic</span>
                <div className="grid gap-4">
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={topicFilters.all} onCheckedChange={() => handleTopicFilter('all')} />
                  <span>All</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={topicFilters.parents} onCheckedChange={() => handleTopicFilter('parents')} />
                  <span>Parents</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={topicFilters.students} onCheckedChange={() => handleTopicFilter('students')} />
                  <span>Students</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={topicFilters.staff} onCheckedChange={() => handleTopicFilter('staff')} />
                  <span>Staff</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={topicFilters.achievements} onCheckedChange={() => handleTopicFilter('achievements')} />
                  <span>Achievements</span>
                </label>
              </div>
              </span>
              <span className="p-4 grid gap-4 text-sm border-b">
                <span className="font-semibold">By date</span>
                <div className="grid gap-4">
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.all} onCheckedChange={() => handleDateFilter('all')} />
                  <span>All</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.thisTerm} onCheckedChange={() => handleDateFilter('thisTerm')} />
                  <span>This term</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.lastTerm} onCheckedChange={() => handleDateFilter('lastTerm')} />
                  <span>Last term</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.twentyFour} onCheckedChange={() => handleDateFilter('twentyFour')} />
                  <span>2024</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.twentyThree} onCheckedChange={() => handleDateFilter('twentyThree')} />
                  <span>2023</span>
                </label>
                <label className="flex gap-2 items-center cursor-pointer">
                  <Checkbox checked={dateFilters.older} onCheckedChange={() => handleDateFilter('older')} />
                  <span>Older</span>
                </label>
              </div>
              </span>
            </div>
            <div
              className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300"
              aria-busy={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {
                loading ?
                (<Spinner loading={loading} />) :
                 currentPosts.length > 0 ? (
                currentPosts.map((item, index) => (
                  <div key={index} className="">
                    <Link to={`/blog/${btoa(item.id)}`}>
                      <img
                        src={`${tlaoURL}${item.image_url}`}
                        alt={item.title}
                        className="aspect-video object-cover rounded-lg"
                      />
                      <div className="grid text-sm mt-2">
                        <span className="font-semibold">{item.title}</span>
                        <span className="leading-6 line-clamp-2 text-gray-600">{item.body}</span>
                        <span className="text- flex items-center gap-3 mt-5 text-blue-600 cursor-pointer hover:text-blue-800">
                          <span>Read more</span>
                          <img src={arrowIcon} alt="" className="size-4"/>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No posts found matching your filters.
                </div>
              )}             
              <div className="md:col-span-2 lg:col-span-3">
{/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default BlogList;
