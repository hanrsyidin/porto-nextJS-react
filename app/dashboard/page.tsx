import Hero from "@/components/hero/hero"
import About from "@/components/about/about"
import GitHubActivityCalendar from "@/components/component/GitHubActivityCalendar"
import ContentCarousel from "@/components/component/ContentCarousel"

export default function Dashboard(){
    return <>
        <div className="h-6"></div>
        <Hero />
        {/* <GitHubActivityCalendar /> */}
        {/* <ContentCarousel /> */}
        <div className="h-8"></div>
        <About />
        <h1>aboutabout</h1>
    </>
}