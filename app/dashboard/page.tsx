import Hero from "@/components/hero/hero"
import About from "@/components/about/about"
import GitHubActivityCalendar from "@/components/component/GitHubActivityCalendar"
import ContentCarousel from "@/components/component/ContentCarousel"
import RecentProjects from "@/components/_projects/RecentProjects"
import CategorizedProjectsViewer from "@/components/portofolio/CategorizedProjectsViewer"

export default function Dashboard(){
    return <>
        <div className="h-8"></div>
        <Hero />
        {/* <GitHubActivityCalendar /> */}
        {/* <ContentCarousel /> */}
        <div className="h-8"></div>
        <About />
        {/* <RecentProjects /> */}
        <CategorizedProjectsViewer />
        <div className="h-200"></div>
    </>
}