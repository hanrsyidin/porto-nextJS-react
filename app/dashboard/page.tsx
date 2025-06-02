import Hero from "@/components/hero/hero"
import About from "@/components/about/about"
import GitHubActivityCalendar from "@/components/component/GitHubActivityCalendar"
import ContentCarousel from "@/components/component/ContentCarousel"

export default function Dashboard(){
    return <>
        <Hero />
        {/* <GitHubActivityCalendar /> */}
        {/* <ContentCarousel /> */}
        <About />
        <h1>aboutabout</h1>
        <div className="h-960"></div>
    </>
}